export interface User {
  id: string;
  email: string;
  name: string;
  gmailConnected: boolean;
}

export interface BudgetCategory {
  id: string;
  name: string;
  type: string;
  limit: number;
  spent: number;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  amount: number;
  vendor: string;
  description: string;
  category: string;
  type: string;
  date: string;
  isAiGenerated: boolean;
}

export interface AuthResponse {
  access_token: string;
}