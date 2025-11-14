import React from 'react';
import { BudgetCategory } from '../types';

interface CategoryCardProps {
  category: BudgetCategory;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const percentage = category.limit > 0 ? (category.spent / category.limit) * 100 : 0;
  const getProgressColor = () => {
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-orange-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
        <span className="text-sm text-gray-600">
          ${category.spent.toFixed(2)} / ${category.limit.toFixed(2)}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className={`h-2 rounded-full transition-all ${getProgressColor()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-600">
        {percentage.toFixed(1)}% used
      </p>
    </div>
  );
};