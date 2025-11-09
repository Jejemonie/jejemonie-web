import React from 'react';
import { ListItem, ListItemText, Typography, Chip, Box } from '@mui/material';
import { Transaction } from '../types';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isExpense = transaction.type === 'expense';
  
  return (
    <ListItem divider>
      <ListItemText
        primary={
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1">{transaction.vendor}</Typography>
            <Typography
              variant="body1"
              color={isExpense ? 'error' : 'success.main'}
              fontWeight="bold"
            >
              {isExpense ? '-' : '+'}${transaction.amount.toFixed(2)}
            </Typography>
          </Box>
        }
        secondary={
          <Box>
            <Typography variant="body2" color="text.secondary">
              {transaction.description}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Chip
                label={transaction.category}
                size="small"
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                {new Date(transaction.date).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};