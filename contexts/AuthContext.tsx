
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, Role } from '../types';
import { api, LoginCredentials, SignUpData } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  signup: (data: SignUpData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifyUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('math_trainer_user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        // In a real app, you'd verify a token with the backend here.
        // For this demo, we'll just trust the localStorage.
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Failed to verify user session", error);
      setUser(null);
      localStorage.removeItem('math_trainer_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    api.initialize(); // Ensure admin exists
    verifyUser();
  }, [verifyUser]);

  const login = async (credentials: LoginCredentials) => {
    const loggedInUser = await api.login(credentials);
    setUser(loggedInUser);
    localStorage.setItem('math_trainer_user', JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('math_trainer_user');
  };

  const signup = async (data: SignUpData) => {
    await api.signup(data);
  };

  const value = {
    user,
    isAuthenticated: !!user,
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
