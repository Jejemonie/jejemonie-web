'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { BudgetCard, Budget } from '../../../components/budget/BudgetCard'
import { CreateBudgetModal } from '../../../components/budget/CreateBudgetModal'
import { EditBudgetModal } from '../../../components/budget/EditBudgetModal'
import { AddTransactionModal } from '../../../components/budget/AddTransactionModal'
import { NotificationSettingsModal } from '../../../components/budget/NotificationSettingsModal'

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      name: 'Monthly Budget - December 2024',
      income: 5000,
      categories: [
        {
          id: '1',
          name: 'Food & Dining',
          percentage: 25,
          allocated: 1250,
          spent: 890,
        },
        {
          id: '2',
          name: 'Transportation',
          percentage: 15,
          allocated: 750,
          spent: 620,
        },
        {
          id: '3',
          name: 'Entertainment',
          percentage: 10,
          allocated: 500,
          spent: 280,
        },
        {
          id: '4',
          name: 'Bills & Utilities',
          percentage: 20,
          allocated: 1000,
          spent: 950,
        },
        {
          id: '5',
          name: 'Savings',
          percentage: 20,
          allocated: 1000,
          spent: 0,
        },
        {
          id: '6',
          name: 'Other',
          percentage: 10,
          allocated: 500,
          spent: 180,
        },
      ],
      createdAt: new Date('2024-12-01'),
      notifications: {
        enabled: true,
        threshold: 80,
      },
    },
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)

  const handleCreateBudget = (newBudget: Omit<Budget, 'id' | 'createdAt'>) => {
    const budget: Budget = {
      ...newBudget,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setBudgets([...budgets, budget])
    setIsCreateModalOpen(false)
  }

  const handleEditBudget = (updatedBudget: Budget) => {
    setBudgets(budgets.map((b) => (b.id === updatedBudget.id ? updatedBudget : b)))
    setIsEditModalOpen(false)
    setSelectedBudget(null)
  }

  const handleDeleteBudget = (budgetId: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setBudgets(budgets.filter((b) => b.id !== budgetId))
    }
  }

  const handleAddTransaction = (
    budgetId: string,
    categoryId: string,
    amount: number
  ) => {
    setBudgets(
      budgets.map((budget) => {
        if (budget.id === budgetId) {
          return {
            ...budget,
            categories: budget.categories.map((cat) =>
              cat.id === categoryId
                ? { ...cat, spent: cat.spent + amount }
                : cat
            ),
          }
        }
        return budget
      })
    )
    setIsTransactionModalOpen(false)
    setSelectedBudget(null)
  }

  const handleUpdateNotifications = (
    budgetId: string,
    notifications: { enabled: boolean; threshold: number }
  ) => {
    setBudgets(
      budgets.map((budget) =>
        budget.id === budgetId ? { ...budget, notifications } : budget
      )
    )
    setIsNotificationModalOpen(false)
    setSelectedBudget(null)
  }

  const openEditModal = (budget: Budget) => {
    setSelectedBudget(budget)
    setIsEditModalOpen(true)
  }

  const openTransactionModal = (budget: Budget) => {
    setSelectedBudget(budget)
    setIsTransactionModalOpen(true)
  }

  const openNotificationModal = (budget: Budget) => {
    setSelectedBudget(budget)
    setIsNotificationModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Budgets</h1>
            <p className="text-gray-600 mt-1">Create and manage your budgets</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Budget</span>
          </button>
        </div>

        {budgets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No budgets yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first budget to start tracking your income and expenses
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Create Your First Budget
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                onEdit={() => openEditModal(budget)}
                onDelete={() => handleDeleteBudget(budget.id)}
                onAddTransaction={() => openTransactionModal(budget)}
                onNotificationSettings={() => openNotificationModal(budget)}
              />
            ))}
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <CreateBudgetModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateBudget}
        />
      )}

      {isEditModalOpen && selectedBudget && (
        <EditBudgetModal
          budget={selectedBudget}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedBudget(null)
          }}
          onSave={handleEditBudget}
        />
      )}

      {isTransactionModalOpen && selectedBudget && (
        <AddTransactionModal
          budget={selectedBudget}
          onClose={() => {
            setIsTransactionModalOpen(false)
            setSelectedBudget(null)
          }}
          onAdd={handleAddTransaction}
        />
      )}

      {isNotificationModalOpen && selectedBudget && (
        <NotificationSettingsModal
          budget={selectedBudget}
          onClose={() => {
            setIsNotificationModalOpen(false)
            setSelectedBudget(null)
          }}
          onSave={handleUpdateNotifications}
        />
      )}
    </div>
  )
}