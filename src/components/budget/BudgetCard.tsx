import { useState } from 'react'
import {
  MoreVertical,
  Edit,
  Trash,
  Plus,
  Bell,
} from 'lucide-react'

export interface Category {
  id: string
  name: string
  percentage: number
  allocated: number
  spent: number
}

export interface Budget {
  id: string
  name: string
  income: number
  categories: Category[]
  createdAt: Date
  notifications: {
    enabled: boolean
    threshold: number
  }
}

interface BudgetCardProps {
  budget: Budget
  onEdit: () => void
  onDelete: () => void
  onAddTransaction: () => void
  onNotificationSettings: () => void
}

export function BudgetCard({
  budget,
  onEdit,
  onDelete,
  onAddTransaction,
  onNotificationSettings,
}: BudgetCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const totalAllocated = budget.categories.reduce((sum, cat) => sum + cat.allocated, 0)
  const totalSpent = budget.categories.reduce((sum, cat) => sum + cat.spent, 0)
  const percentageUsed = (totalSpent / totalAllocated) * 100

  const getProgressColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100
    if (percentage >= 100) return 'bg-red-500'
    if (percentage >= 80) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{budget.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Income: ${budget.income.toLocaleString()}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <button
                  onClick={() => {
                    onAddTransaction()
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Transaction</span>
                </button>
                <button
                  onClick={() => {
                    onEdit()
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Budget</span>
                </button>
                <button
                  onClick={() => {
                    onNotificationSettings()
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notification Settings</span>
                </button>
                <button
                  onClick={() => {
                    onDelete()
                    setIsMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <Trash className="h-4 w-4" />
                  <span>Delete Budget</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Overall Budget Usage
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {percentageUsed.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              percentageUsed >= 100
                ? 'bg-red-500'
                : percentageUsed >= 80
                ? 'bg-yellow-500'
                : 'bg-orange-500'
            }`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
          <span>${totalSpent.toLocaleString()} spent</span>
          <span>${totalAllocated.toLocaleString()} allocated</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-900">Categories</h4>
        {budget.categories.map((category) => {
          const categoryPercentage = (category.spent / category.allocated) * 100
          return (
            <div key={category.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{category.name}</span>
                <span className="text-sm font-medium text-gray-900">
                  ${category.spent} / ${category.allocated}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all ${getProgressColor(
                    category.spent,
                    category.allocated
                  )}`}
                  style={{ width: `${Math.min(categoryPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      {budget.notifications.enabled && (
        <div className="mt-6 flex items-center space-x-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
          <Bell className="h-4 w-4" />
          <span>Alerts enabled at {budget.notifications.threshold}%</span>
        </div>
      )}
    </div>
  )
}