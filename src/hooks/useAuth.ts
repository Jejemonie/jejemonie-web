import { useState, useEffect } from 'react';
import { User } from '../types';
import { authApi } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        authApi.getCurrentUser()
          .then(setUser)
          .catch(() => authApi.logout())
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    await authApi.login(email, password);
    const userData = await authApi.getCurrentUser();
    setUser(userData);
  };

  const signup = async (email: string, password: string, name: string) => {
    await authApi.signup(email, password, name);
    const userData = await authApi.getCurrentUser();
    setUser(userData);
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return { user, loading, login, signup, logout };
};