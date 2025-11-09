'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material'
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { DashboardLayout } from '../../components/DashboardLayout'
import { CategoryCard } from '../../components/CategoryCard'
import { BudgetCategory } from '../../types'
import { budgetApi } from '../../services/api'

export default function BudgetPage() {
  const [categories, setCategories] = useState<BudgetCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await budgetApi.getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, categoryId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedCategory(categoryId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedCategory(null)
  }

  const handleCreateBudget = () => {
    router.push('/budget/create')
  }

  const totalBudget = categories.reduce((sum, cat) => sum + cat.limit, 0)
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0)

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
        <Box className="flex justify-between items-center">
          <Box>
            <Typography variant="h4" className="font-bold text-gray-900 mb-2">
              Budget Management
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Create and manage your budget categories
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateBudget}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create Budget
          </Button>
        </Box>

        {/* Budget Summary */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent>
                <Typography variant="h6" className="mb-2">
                  Total Budget
                </Typography>
                <Typography variant="h3" className="font-bold">
                  ${totalBudget.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent>
                <Typography variant="h6" className="mb-2">
                  Total Spent
                </Typography>
                <Typography variant="h3" className="font-bold">
                  ${totalSpent.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent>
                <Typography variant="h6" className="mb-2">
                  Remaining
                </Typography>
                <Typography variant="h3" className="font-bold">
                  ${(totalBudget - totalSpent).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Budget Categories */}
        <Box>
          <Typography variant="h5" className="font-semibold mb-4">
            Budget Categories ({categories.length})
          </Typography>
          
          {categories.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Typography variant="h6" className="text-gray-500 mb-4">
                  No budget categories yet
                </Typography>
                <Typography variant="body2" className="text-gray-400 mb-6">
                  Create your first budget category to start tracking your expenses
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateBudget}
                >
                  Create Your First Budget
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {categories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category.id}>
                  <Card className="relative">
                    <CardContent>
                      <Box className="flex justify-between items-start mb-3">
                        <Box className="flex items-center gap-2">
                          <Box
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <Typography variant="h6" className="font-semibold">
                            {category.name}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, category.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                      
                      <Chip
                        label={category.type}
                        size="small"
                        className="mb-3"
                        color="primary"
                        variant="outlined"
                      />
                      
                      <CategoryCard category={category} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add budget"
          onClick={handleCreateBudget}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700"
        >
          <AddIcon />
        </Fab>

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <EditIcon className="mr-2" />
            Edit Budget
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className="text-red-600">
            <DeleteIcon className="mr-2" />
            Delete Budget
          </MenuItem>
        </Menu>
      </Box>
    </DashboardLayout>
  )
}