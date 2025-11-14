import { useState } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    if (email === 'user@example.com' && password === 'password123') {
      setUser({
        id: '1',
        email: 'user@example.com',
        name: 'Test User',
        gmailConnected: false
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setUser({
      id: '1',
      email,
      name,
      gmailConnected: false
    });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, signup, logout };
};