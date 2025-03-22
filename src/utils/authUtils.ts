
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
    console.log("Starting signup process for:", email);
    
    // Sign up the user with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name, // Store name in user metadata
        }
      }
    });

    if (authError) {
      console.error("Auth error during signup:", authError);
      throw authError;
    }

    console.log("Auth signup successful:", authData?.user?.id);

    if (authData && authData.user) {
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
      // Create user data for localStorage (for backward compatibility)
      const userData: UserData = {
        id: data.user.id,
        name: email.split('@')[0], // Use part of email as name
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
