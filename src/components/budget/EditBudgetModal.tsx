import { useState } from 'react'
import { X, Plus, Trash } from 'lucide-react'
import { Budget } from './BudgetCard'

interface EditBudgetModalProps {
  budget: Budget
  onClose: () => void
  onSave: (budget: Budget) => void
}

export function EditBudgetModal({ budget, onClose, onSave }: EditBudgetModalProps) {
  const [name, setName] = useState(budget.name)
  const [income, setIncome] = useState(budget.income.toString())
  const [categories, setCategories] = useState(budget.categories)

  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0)

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        id: Date.now().toString(),
        name: '',
        percentage: 0,
        allocated: 0,
        spent: 0,
      },
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
    const updatedBudget: Budget = {
      ...budget,
      name,
      income: incomeValue,
      categories: categories.map((cat) => ({
        ...cat,
        allocated: (incomeValue * cat.percentage) / 100,
      })),
    }
    onSave(updatedBudget)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Edit Budget</h2>
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
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) =>
                        updateCategory(category.id, 'name', e.target.value)
                      }
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
                  <div className="text-xs text-gray-600 ml-1">
                    Current spending: ${category.spent.toFixed(2)} of $
                    {category.allocated.toFixed(2)}
                  </div>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}