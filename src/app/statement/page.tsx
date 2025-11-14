'use client'

import { useState, useEffect } from 'react'
import { Download, Filter } from 'lucide-react'
import { TransactionItem } from '../../components/TransactionItem'
import { Transaction } from '../../types'
import { budgetApi } from '../../services/api'

export default function StatementPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    dateRange: '30',
  })

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await budgetApi.getTransactions()
        setTransactions(data)
        setFilteredTransactions(data)
      } catch (error) {
        console.error('Failed to fetch transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  useEffect(() => {
    let filtered = transactions

    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category)
    }

    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type)
    }

    // Date filtering logic would go here
    setFilteredTransactions(filtered)
  }, [transactions, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const categories = Array.from(new Set(transactions.map(t => t.category)))

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Transaction Statement
            </h1>
            <p className="text-gray-600">
              View and analyze all your transactions
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">
              Total Income
            </h3>
            <p className="text-3xl font-bold">
              ${totalIncome.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">
              Total Expenses
            </h3>
            <p className="text-3xl font-bold">
              ${totalExpenses.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">
              Net Balance
            </h3>
            <p className="text-3xl font-bold">
              ${(totalIncome - totalExpenses).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold">
              Filters
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
              <button
                onClick={() => setFilters({ category: '', type: '', dateRange: '30' })}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Transactions ({filteredTransactions.length})
              </h2>
              <span className="px-3 py-1 text-sm font-medium text-orange-700 bg-orange-100 rounded-full border border-orange-200">
                {filteredTransactions.length} of {transactions.length}
              </span>
            </div>
            
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg text-gray-500 mb-2">
                  No transactions found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your filters or date range
                </p>
              </div>
            ) : (
              <div>
                {filteredTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}