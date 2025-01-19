import { useState, useEffect } from 'react';
import apiClient from '../lib/axios';

interface User {
  email: string;
  id: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiClient.get('/api/v1/auth/validate_token');
        setAuthState({
          isAuthenticated: true,
          user: response.data.data,
          isLoading: false,
        });
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
};