import { useState } from 'react'
import { X, Plus, Trash } from 'lucide-react'
import { Budget } from './BudgetCard'

interface CreateBudgetModalProps {
  onClose: () => void
  onCreate: (budget: Omit<Budget, 'id' | 'createdAt'>) => void
}

export function CreateBudgetModal({ onClose, onCreate }: CreateBudgetModalProps) {
  const [name, setName] = useState('')
  const [income, setIncome] = useState('')
  const [categories, setCategories] = useState([
    { id: '1', name: 'Food & Dining', percentage: 25 },
    { id: '2', name: 'Transportation', percentage: 15 },
    { id: '3', name: 'Entertainment', percentage: 10 },
    { id: '4', name: 'Bills & Utilities', percentage: 20 },
    { id: '5', name: 'Savings', percentage: 20 },
    { id: '6', name: 'Other', percentage: 10 },
  ])

  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0)

  const addCategory = () => {
    setCategories([
      ...categories,
      { id: Date.now().toString(), name: '', percentage: 0 },
    ])
  }

  const removeCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const updateCategory = (
    id: string,
    field: 'name' | 'percentage',
    value: string | number
  ) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (totalPercentage !== 100) {
      alert('Total percentage must equal 100%')
      return
    }

    const incomeValue = parseFloat(income)
    const newBudget: Omit<Budget, 'id' | 'createdAt'> = {
      name,
      income: incomeValue,
      categories: categories.map((cat) => ({
        ...cat,
        allocated: (incomeValue * cat.percentage) / 100,
        spent: 0,
      })),
      notifications: { enabled: false, threshold: 80 },
    }
    onCreate(newBudget)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Create New Budget</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Monthly Budget - December 2024"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Income
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="5000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Categories & Allocation
              </label>
              <button
                type="button"
                onClick={addCategory}
                className="flex items-center space-x-1 text-sm text-orange-600 hover:text-orange-700"
              >
                <Plus className="h-4 w-4" />
                <span>Add Category</span>
              </button>
            </div>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) =>
                      updateCategory(category.id, 'name', e.target.value)
                    }
                    placeholder="Category name"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={category.percentage}
                      onChange={(e) =>
                        updateCategory(
                          category.id,
                          'percentage',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="text-gray-600">%</span>
                  </div>
                  {categories.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Total Allocation
                </span>
                <span
                  className={`text-lg font-semibold ${
                    totalPercentage === 100
                      ? 'text-green-600'
                      : totalPercentage > 100
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {totalPercentage.toFixed(1)}%
                </span>
              </div>
              {totalPercentage !== 100 && (
                <p className="text-xs text-gray-600 mt-1">
                  {totalPercentage > 100
                    ? 'Total exceeds 100%. Please adjust.'
                    : 'Total must equal 100%'}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Create Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}