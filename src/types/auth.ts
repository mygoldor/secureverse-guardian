
import { User, Session } from '@supabase/supabase-js';

export interface UserData {
  id?: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
  subscriptionActive: boolean;
}

export interface AuthContextType {
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
