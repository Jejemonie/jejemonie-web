'use client'

import { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Calendar,
  PieChart,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

type TimePeriod = 'weekly' | 'monthly' | 'yearly'

interface MetricCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  trend: 'up' | 'down'
}

function MetricCard({ title, value, change, icon, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
          {icon}
        </div>
        <div
          className={`flex items-center space-x-1 text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly')

  const weeklyData = [
    { name: 'Mon', spending: 120, income: 0 },
    { name: 'Tue', spending: 85, income: 0 },
    { name: 'Wed', spending: 150, income: 0 },
    { name: 'Thu', spending: 95, income: 0 },
    { name: 'Fri', spending: 200, income: 0 },
    { name: 'Sat', spending: 180, income: 0 },
    { name: 'Sun', spending: 140, income: 500 },
  ]

  const monthlyData = [
    { name: 'Jan', spending: 2400, income: 3200 },
    { name: 'Feb', spending: 2100, income: 3200 },
    { name: 'Mar', spending: 2600, income: 3200 },
    { name: 'Apr', spending: 2300, income: 3200 },
    { name: 'May', spending: 2800, income: 3200 },
    { name: 'Jun', spending: 2500, income: 3200 },
  ]

  const yearlyData = [
    { name: '2019', spending: 28000, income: 38000 },
    { name: '2020', spending: 30000, income: 40000 },
    { name: '2021', spending: 32000, income: 42000 },
    { name: '2022', spending: 35000, income: 45000 },
    { name: '2023', spending: 33000, income: 48000 },
  ]

  const categoryData = [
    { name: 'Food & Dining', value: 850, color: '#FF6B35' },
    { name: 'Transportation', value: 420, color: '#10B981' },
    { name: 'Entertainment', value: 280, color: '#F59E0B' },
    { name: 'Shopping', value: 650, color: '#EF4444' },
    { name: 'Bills & Utilities', value: 520, color: '#8B5CF6' },
    { name: 'Other', value: 180, color: '#6B7280' },
  ]

  const getChartData = () => {
    switch (timePeriod) {
      case 'weekly':
        return weeklyData
      case 'monthly':
        return monthlyData
      case 'yearly':
        return yearlyData
      default:
        return monthlyData
    }
  }

  const metrics = {
    transactions: timePeriod === 'weekly' ? '47' : timePeriod === 'monthly' ? '234' : '2,847',
    totalSpending: timePeriod === 'weekly' ? '$970' : timePeriod === 'monthly' ? '$2,500' : '$33,000',
    totalIncome: timePeriod === 'weekly' ? '$500' : timePeriod === 'monthly' ? '$3,200' : '$48,000',
    budgetUsed: timePeriod === 'weekly' ? '32%' : timePeriod === 'monthly' ? '78%' : '69%',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's your financial overview.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <button
              onClick={() => setTimePeriod('weekly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timePeriod === 'weekly'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimePeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timePeriod === 'monthly'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimePeriod('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timePeriod === 'yearly'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Transactions"
            value={metrics.transactions}
            change={12}
            trend="up"
            icon={<CreditCard className="h-6 w-6" />}
          />
          <MetricCard
            title="Total Spending"
            value={metrics.totalSpending}
            change={5}
            trend="down"
            icon={<DollarSign className="h-6 w-6" />}
          />
          <MetricCard
            title="Total Income"
            value={metrics.totalIncome}
            change={8}
            trend="up"
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <MetricCard
            title="Budget Used"
            value={metrics.budgetUsed}
            change={3}
            trend="up"
            icon={<PieChart className="h-6 w-6" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Income vs Spending
              </h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="#10B981"
                  name="Income"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="spending"
                  fill="#FF6B35"
                  name="Spending"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Spending by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-gray-700">{category.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${category.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Spending Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="spending"
                stroke="#FF6B35"
                strokeWidth={3}
                dot={{ fill: '#FF6B35', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}