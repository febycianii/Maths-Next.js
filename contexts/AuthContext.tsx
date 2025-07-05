/**
 * AuthContext.tsx
 *
 * This file defines the authentication context for the application.
 * It provides a way to share user authentication state and related functions
 * (login, logout, signup) across the entire component tree without prop drilling.
 */
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { User, Role } from '../types';
import { api, LoginCredentials, SignUpData } from '../services/api';

/**
 * Defines the shape of the data and functions provided by the AuthContext.
 */
interface AuthContextType {
  user: User | null;          // The current authenticated user object, or null if not logged in.
  isAuthenticated: boolean;   // A boolean flag indicating if a user is authenticated.
  isLoading: boolean;         // A flag to indicate if the initial user session verification is in progress.
  login: (credentials: LoginCredentials) => Promise<void>; // Function to log in a user.
  logout: () => void;         // Function to log out the current user.
  signup: (data: SignUpData) => Promise<void>;   // Function to register a new user.
}

// Create the context with an initial value of 'undefined'.
// The 'useAuth' hook will ensure this context is only accessed within its provider.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * The AuthProvider component wraps the application and provides the AuthContext value.
 * It manages the user state, handles session persistence with localStorage, and
 * exposes authentication functions.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // This function is responsible for checking if a user session exists in localStorage
  // on application load.
  const verifyUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('math_trainer_user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        // In a real application, you would typically verify a session token with a backend here.
        // For this demo, we trust the data in localStorage.
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to verify user session", error);
      // If there's an error, clear the user state and localStorage.
      setUser(null);
      localStorage.removeItem('math_trainer_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // On initial mount, initialize the mock API (to ensure the admin user exists)
  // and verify any existing user session.
  useEffect(() => {
    api.initialize();
    verifyUser();
  }, [verifyUser]);

  // Handles the login process by calling the API, setting user state,
  // and storing the user object in localStorage.
  const login = async (credentials: LoginCredentials) => {
    const loggedInUser = await api.login(credentials);
    setUser(loggedInUser);
    localStorage.setItem('math_trainer_user', JSON.stringify(loggedInUser));
  };

  // Clears user state and removes the user object from localStorage.
  const logout = () => {
    setUser(null);
    localStorage.removeItem('math_trainer_user');
  };

  // Handles the signup process by calling the API.
  const signup = async (data: SignUpData) => {
    await api.signup(data);
  };

  // The value provided to consuming components.
  const value = {
    user,
    isAuthenticated: !!user, // Coerce user object to boolean.
    isLoading,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};