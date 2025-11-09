'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  Chip,
  LinearProgress,
} from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  CreditCard,
} from '@mui/icons-material'
import { DashboardLayout } from '../../components/DashboardLayout'
import { TransactionItem } from '../../components/TransactionItem'
import { BudgetCategory, Transaction } from '../../types'
import { budgetApi } from '../../services/api'

interface StatCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: React.ReactNode
}

function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
  return (
    <Card className="h-full">
      <CardContent>
        <Box className="flex items-center justify-between">
          <Box>
            <Typography variant="body2" className="text-gray-600 mb-1">
              {title}
            </Typography>
            <Typography variant="h4" className="font-bold mb-2">
              {value}
            </Typography>
            <Box className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="text-green-500 w-4 h-4" />
              ) : (
                <TrendingDown className="text-red-500 w-4 h-4" />
              )}
              <Typography
                variant="body2"
                className={isPositive ? 'text-green-500' : 'text-red-500'}
              >
                {change}
              </Typography>
            </Box>
          </Box>
          <Box className="text-blue-500">{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [categories, setCategories] = useState<BudgetCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, transactionsData] = await Promise.all([
          budgetApi.getCategories(),
          budgetApi.getTransactions(),
        ])
        setCategories(categoriesData)
        setTransactions(transactionsData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalBudget = categories.reduce((sum, cat) => sum + cat.limit, 0)
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0)
  const remainingBudget = totalBudget - totalSpent
  const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <Box className="space-y-6">
        {/* Header */}
        <Box>
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
            Dashboard
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Welcome back! Here's your financial overview.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Budget"
              value={`$${totalBudget.toLocaleString()}`}
              change="+2.5%"
              isPositive={true}
              icon={<AccountBalance className="w-8 h-8" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Spent"
              value={`$${totalSpent.toLocaleString()}`}
              change="+12.3%"
              isPositive={false}
              icon={<CreditCard className="w-8 h-8" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Remaining"
              value={`$${remainingBudget.toLocaleString()}`}
              change="-8.1%"
              isPositive={false}
              icon={<TrendingDown className="w-8 h-8" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Budget Used"
              value={`${spentPercentage.toFixed(1)}%`}
              change="+5.2%"
              isPositive={spentPercentage < 80}
              icon={<TrendingUp className="w-8 h-8" />}
            />
          </Grid>
        </Grid>

        {/* Budget Overview & Recent Transactions */}
        <Grid container spacing={3}>
          {/* Budget Categories */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-4">
                  Budget Categories
                </Typography>
                <Box className="space-y-4">
                  {categories.slice(0, 5).map((category) => {
                    const percentage = category.limit > 0 ? (category.spent / category.limit) * 100 : 0
                    return (
                      <Box key={category.id}>
                        <Box className="flex justify-between items-center mb-2">
                          <Typography variant="body2" className="font-medium">
                            {category.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            ${category.spent.toFixed(0)} / ${category.limit.toFixed(0)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(percentage, 100)}
                          className="h-2 rounded-full"
                          sx={{
                            backgroundColor: '#f0f0f0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor:
                                percentage > 90 ? '#ef4444' : percentage > 70 ? '#f59e0b' : '#10b981',
                              borderRadius: '4px',
                            },
                          }}
                        />
                      </Box>
                    )
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Transactions */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-4">
                  Recent Transactions
                </Typography>
                <List className="space-y-1">
                  {transactions.slice(0, 5).map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  )
}