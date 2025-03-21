
import { supabase } from '@/integrations/supabase/client';

export interface UserData {
  id?: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
  subscriptionActive: boolean;
}

// Sign up a new user with Supabase
export const signUpUser = async (email: string, password: string, name: string) => {
  try {
    // Sign up the user with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData && authData.user) {
      // Create a profile for the user in user_profiles table
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          'user_id (type: uuid, set as unique)': authData.user.id,
          name: name,
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }

      // Create user data for localStorage (for backward compatibility)
      const userData: UserData = {
        id: authData.user.id,
        name: name,
        email: email,
        isAuthenticated: true,
        subscriptionActive: false
      };
      
      // Store in localStorage for current app compatibility
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    }
    
    return { success: false, error: new Error('User creation failed') };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error };
  }
};

// Sign in an existing user
export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (data && data.user) {
      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id (type: uuid, set as unique)', data.user.id)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching user profile:', profileError);
      }
      
      // Create user data for localStorage (for backward compatibility)
      const userData: UserData = {
        id: data.user.id,
        name: profileData?.name || email.split('@')[0],
        email: email,
        isAuthenticated: true,
        subscriptionActive: false // This would be updated based on subscription check
      };
      
      // Store in localStorage for current app compatibility
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    }
    
    return { success: false, error: new Error('Login failed') };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error };
  }
};

// Sign out a user
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    // Remove user data from localStorage
    localStorage.removeItem('user');
    
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error };
  }
};
