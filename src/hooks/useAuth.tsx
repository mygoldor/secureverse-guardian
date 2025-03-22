
// This file should not import from itself via another module
// Change from importing AuthProvider from the same file
import { AuthProvider, useAuth } from './auth/AuthContext';

export { AuthProvider, useAuth };
