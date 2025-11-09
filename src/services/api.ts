import axios from 'axios';
import { User, BudgetCategory, Transaction, AuthResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string): Promise<string> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    const token = response.data.access_token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
    return token;
  },

  signup: async (email: string, password: string, name: string): Promise<string> => {
    const response = await api.post<AuthResponse>('/auth/signup', { email, password, name });
    const token = response.data.access_token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
    return token;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
};

export const budgetApi = {
  getCategories: async (): Promise<BudgetCategory[]> => {
    const response = await api.get<BudgetCategory[]>('/categories');
    return response.data;
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
  }
};