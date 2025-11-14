'use client'

import { useState } from 'react'
import {
  Mail,
  Building2,
  CreditCard,
  Phone,
  CheckCircle,
  AlertTriangle,
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
    icon: <Mail className="h-5 w-5" />,
    connected: false,
    status: 'inactive',
  },
  {
    id: 'bank',
    name: 'Bank Account',
    description: 'Connect your bank account for real-time transaction data',
    icon: <Building2 className="h-5 w-5" />,
    connected: true,
    status: 'active',
    lastSync: '2 hours ago',
  },
  {
    id: 'credit-card',
    name: 'Credit Cards',
    description: 'Link your credit cards to track spending automatically',
    icon: <CreditCard className="h-5 w-5" />,
    connected: true,
    status: 'error',
    lastSync: '1 day ago',
  },
  {
    id: 'sms',
    name: 'SMS Alerts',
    description: 'Import transaction notifications from SMS messages',
    icon: <Phone className="h-5 w-5" />,
    connected: false,
    status: 'inactive',
  },
]

export default function IntegrationsPage() {
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
        return 'success'
      case 'error':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Integrations
        </h1>
        <p className="text-gray-600">
          Connect your accounts and services to automatically track transactions
        </p>
      </div>

      {/* Status Alert */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
        <p className="text-sm">
          <strong>Secure Connection:</strong> All integrations use bank-level encryption and read-only access to protect your data.
        </p>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrationList.map((integration) => (
          <div key={integration.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  {integration.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {integration.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                      integration.status === 'active' ? 'text-green-700 bg-green-50 border-green-200' :
                      integration.status === 'error' ? 'text-red-700 bg-red-50 border-red-200' :
                      'text-gray-700 bg-gray-50 border-gray-200'
                    }`}>
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
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <p className="text-gray-600 mb-4 text-sm">
              {integration.description}
            </p>

            {integration.connected && integration.lastSync && (
              <div>
                <hr className="border-gray-200 mb-3" />
                <p className="text-xs text-gray-500">
                  Last synced: {integration.lastSync}
                </p>
              </div>
            )}

            {integration.connected && (
              <div className="mt-4">
                <button className="w-full px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors text-sm">
                  Configure
                </button>
              </div>
            )}

            {!integration.connected && (
              <div className="mt-4">
                <button
                  onClick={() => handleToggleIntegration(integration.id)}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  Connect
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Gmail Integration Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">
          Gmail Integration Setup
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Connect your Gmail account to automatically import transaction alerts from banks and financial institutions.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2 text-sm">
            What we'll access:
          </h3>
          <ul className="text-sm text-gray-600 space-y-1 ml-4">
            <li>• Read-only access to emails from financial institutions</li>
            <li>• Transaction alerts and notifications</li>
            <li>• Account balance updates</li>
            <li>• Payment confirmations</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2 text-blue-800 text-sm">
            Privacy & Security:
          </h3>
          <p className="text-blue-700 text-sm">
            We only read emails from known financial institutions and never access personal emails or sensitive information.
          </p>
        </div>
      </div>
    </div>
  )
}