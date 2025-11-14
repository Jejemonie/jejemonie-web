'use client'

import { useState } from 'react'
import {
  Mail,
  Building2,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Shield,
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  connected: boolean
  status: 'active' | 'inactive' | 'error'
  lastSync?: string
}

const integrations: Integration[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Automatically import transaction alerts from your email',
    icon: <Mail className="h-6 w-6" />,
    connected: false,
    status: 'inactive',
  },
  {
    id: 'bank',
    name: 'Bank Account',
    description: 'Connect your bank account for real-time transaction data',
    icon: <Building2 className="h-6 w-6" />,
    connected: true,
    status: 'active',
    lastSync: '2 hours ago',
  },
  {
    id: 'credit-card',
    name: 'Credit Cards',
    description: 'Link your credit cards to track spending automatically',
    icon: <CreditCard className="h-6 w-6" />,
    connected: true,
    status: 'error',
    lastSync: '1 day ago',
  },
]

export default function ConnectPage() {
  const [integrationList, setIntegrationList] = useState(integrations)

  const handleToggleIntegration = (id: string) => {
    setIntegrationList(prev =>
      prev.map(integration =>
        integration.id === id
          ? {
              ...integration,
              connected: !integration.connected,
              status: !integration.connected ? 'active' : 'inactive',
            }
          : integration
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Connect Your Accounts
        </h1>
        <p className="text-gray-600">
          Link your financial accounts to automatically track transactions and budgets
        </p>
      </div>

      {/* Security Alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-orange-800">
              Bank-level security
            </h3>
            <p className="text-sm text-orange-700">
              All connections use read-only access and 256-bit encryption to protect your data.
            </p>
          </div>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrationList.map((integration) => (
          <div key={integration.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                  {integration.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {integration.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </span>
                    {getStatusIcon(integration.status)}
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={integration.connected}
                  onChange={() => handleToggleIntegration(integration.id)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              {integration.description}
            </p>

            {integration.connected && integration.lastSync && (
              <p className="text-xs text-gray-500">
                Last synced: {integration.lastSync}
              </p>
            )}

            {!integration.connected && (
              <button
                onClick={() => handleToggleIntegration(integration.id)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                Connect Now
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Setup Guide */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          How Integrations Work
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 text-sm mb-4">
              Connect your accounts to automatically import transactions and keep your budget up to date.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                What we access:
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Transaction history</li>
                <li>• Account balances</li>
                <li>• Payment confirmations</li>
                <li>• Category information</li>
              </ul>
            </div>
          </div>
          <div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-orange-800 mb-2">
                Privacy guaranteed:
              </h4>
              <p className="text-sm text-orange-700">
                We use read-only access and never store sensitive information like passwords or PINs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}