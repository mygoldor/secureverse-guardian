
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserData } from '@/utils/authUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    success: boolean;
    error?: Error | unknown;
    user?: UserData;
  }>;
  signUp: (email: string, password: string, name: string) => Promise<{
    success: boolean;
    error?: Error | unknown;
    user?: UserData;
  }>;
  signOut: () => Promise<{ success: boolean; error?: Error | unknown }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state change event:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Store user data in localStorage for compatibility with existing code
        if (currentSession?.user) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            userData.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } else {
          // On sign out
          localStorage.removeItem('user');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession ? "Session found" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
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

  const signUp = async (email: string, password: string, name: string) => {
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

  const signOut = async () => {
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

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
