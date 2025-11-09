import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import { BudgetCategory } from '../types';

interface CategoryCardProps {
  category: BudgetCategory;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const percentage = category.limit > 0 ? (category.spent / category.limit) * 100 : 0;
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">{category.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            ${category.spent.toFixed(2)} / ${category.limit.toFixed(2)}
          </Typography>
        </Box>
        
        <LinearProgress
          variant="determinate"
          value={Math.min(percentage, 100)}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: percentage > 90 ? '#f44336' : percentage > 70 ? '#ff9800' : '#4caf50'
            }
          }}
        />
        
        <Typography variant="body2" color="text.secondary" mt={1}>
          {percentage.toFixed(1)}% used
        </Typography>
      </CardContent>
    </Card>
  );
};