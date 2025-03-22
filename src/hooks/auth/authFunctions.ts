
import { supabase } from '@/integrations/supabase/client';
import { UserData } from '@/types/auth';

// Sign in an existing user with email and password
export const signInWithEmailPassword = async (email: string, password: string) => {
  console.log("Signing in with email:", email);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Auth error during signin:", error);
      throw error;
    }
    
    console.log("Sign in successful:", data.user?.id);
    
    if (data && data.user) {
      // Get user profile
      // Using type assertion because the Supabase type doesn't match the actual table structure
      const { data: profileData, error: profileError } = await supabase
        .from('profiles' as any)
        .select('*')
        .eq('user_id', data.user.id)
        .single();
        
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
      }
      
      // Create user data for localStorage (for backward compatibility)
      const userData: UserData = {
        id: data.user.id,
        // Use optional chaining and type assertion to safely access the name property
        name: (profileData as any)?.name || email.split('@')[0],
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

// Sign up a new user with email, password, and name
export const signUpWithEmailPassword = async (email: string, password: string, name: string) => {
  console.log("Starting signup process for:", email);
  try {
    // Sign up the user with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (authError) {
      console.error("Auth error during signup:", authError);
      throw authError;
    }

    console.log("Auth signup successful:", authData?.user?.id);

    if (authData && authData.user) {
      // Create a profile for the user in profiles table
      // Using type assertion because the Supabase type doesn't match the actual table structure
      const { error: profileError } = await supabase
        .from('profiles' as any)
        .insert({
          user_id: authData.user.id,
          name: name,
        } as any);

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

// Sign out the current user
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
