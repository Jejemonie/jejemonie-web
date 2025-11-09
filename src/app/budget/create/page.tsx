'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Chip,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  ColorLens as ColorLensIcon,
} from '@mui/icons-material'
import { DashboardLayout } from '../../../components/DashboardLayout'

const budgetTypes = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Personal Care',
  'Other',
]

const colorOptions = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280', // Gray
]

export default function CreateBudgetPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    limit: '',
    color: colorOptions[0],
    description: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Budget name is required'
    }
    if (!formData.type) {
      newErrors.type = 'Budget type is required'
    }
    if (!formData.limit || parseFloat(formData.limit) <= 0) {
      newErrors.limit = 'Budget limit must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      // TODO: Implement API call to create budget
      console.log('Creating budget:', formData)
      router.push('/budget')
    } catch (error) {
      console.error('Failed to create budget:', error)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <DashboardLayout>
      <Box className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Box className="flex items-center gap-4">
          <IconButton onClick={handleBack} className="p-2">
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" className="font-bold text-gray-900">
              Create New Budget
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Set up a new budget category to track your expenses
            </Typography>
          </Box>
        </Box>

        {/* Form */}
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Grid container spacing={3}>
                {/* Budget Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Budget Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    placeholder="e.g., Monthly Groceries"
                  />
                </Grid>

                {/* Budget Type */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Budget Type</InputLabel>
                    <Select
                      value={formData.type}
                      label="Budget Type"
                      onChange={(e) => handleInputChange('type', e.target.value)}
                    >
                      {budgetTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Budget Limit */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Budget Limit"
                    type="number"
                    value={formData.limit}
                    onChange={(e) => handleInputChange('limit', e.target.value)}
                    error={!!errors.limit}
                    helperText={errors.limit}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    placeholder="0.00"
                  />
                </Grid>

                {/* Color Selection */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" className="mb-3 font-medium">
                    Choose Color
                  </Typography>
                  <Box className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <Box
                        key={color}
                        className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                          formData.color === color ? 'border-gray-400' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleInputChange('color', color)}
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description (Optional)"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Add any additional notes about this budget..."
                  />
                </Grid>
              </Grid>

              {/* Preview */}
              <Box className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="subtitle2" className="mb-3 font-medium">
                  Preview
                </Typography>
                <Box className="flex items-center gap-3">
                  <Box
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: formData.color }}
                  />
                  <Typography variant="h6" className="font-semibold">
                    {formData.name || 'Budget Name'}
                  </Typography>
                  {formData.type && (
                    <Chip label={formData.type} size="small" variant="outlined" />
                  )}
                </Box>
                <Typography variant="body2" className="text-gray-600 mt-2">
                  Limit: ${formData.limit || '0.00'}
                </Typography>
              </Box>

              {/* Actions */}
              <Box className="flex gap-3 pt-4">
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Create Budget
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  )
}