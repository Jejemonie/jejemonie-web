import React from 'react';
import { Transaction } from '../types';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isExpense = transaction.type === 'expense';
  
  return (
    <div className="border-b border-gray-100 py-4 px-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-900">{transaction.vendor}</span>
        <span className={`font-bold ${
          isExpense ? 'text-red-600' : 'text-green-600'
        }`}>
          {isExpense ? '-' : '+'}${transaction.amount.toFixed(2)}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-2">{transaction.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="inline-block px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full border">
          {transaction.category}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(transaction.date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};