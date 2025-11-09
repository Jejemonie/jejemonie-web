'use client'

import { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  Chip,
  Avatar,
  Divider,
  Alert,
} from '@mui/material'
import {
  Email as EmailIcon,
  AccountBalance as BankIcon,
  CreditCard as CardIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material'
import { DashboardLayout } from '../../components/DashboardLayout'

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
    icon: <EmailIcon />,
    connected: false,
    status: 'inactive',
  },
  {
    id: 'bank',
    name: 'Bank Account',
    description: 'Connect your bank account for real-time transaction data',
    icon: <BankIcon />,
    connected: true,
    status: 'active',
    lastSync: '2 hours ago',
  },
  {
    id: 'credit-card',
    name: 'Credit Cards',
    description: 'Link your credit cards to track spending automatically',
    icon: <CardIcon />,
    connected: true,
    status: 'error',
    lastSync: '1 day ago',
  },
  {
    id: 'sms',
    name: 'SMS Alerts',
    description: 'Import transaction notifications from SMS messages',
    icon: <PhoneIcon />,
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
        return <CheckCircleIcon className="text-green-500" />
      case 'error':
        return <WarningIcon className="text-red-500" />
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <Box className="space-y-6">
        {/* Header */}
        <Box>
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
            Integrations
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Connect your accounts and services to automatically track transactions
          </Typography>
        </Box>

        {/* Status Alert */}
        <Alert severity="info" className="mb-6">
          <Typography variant="body2">
            <strong>Secure Connection:</strong> All integrations use bank-level encryption and read-only access to protect your data.
          </Typography>
        </Alert>

        {/* Integration Cards */}
        <Grid container spacing={3}>
          {integrationList.map((integration) => (
            <Grid item xs={12} md={6} key={integration.id}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <Box className="flex items-start justify-between mb-4">
                    <Box className="flex items-center gap-3">
                      <Avatar className="bg-blue-100 text-blue-600">
                        {integration.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" className="font-semibold">
                          {integration.name}
                        </Typography>
                        <Box className="flex items-center gap-2 mt-1">
                          <Chip
                            label={integration.status}
                            size="small"
                            color={getStatusColor(integration.status) as any}
                            variant="outlined"
                          />
                          {getStatusIcon(integration.status)}
                        </Box>
                      </Box>
                    </Box>
                    <Switch
                      checked={integration.connected}
                      onChange={() => handleToggleIntegration(integration.id)}
                      color="primary"
                    />
                  </Box>

                  <Typography variant="body2" className="text-gray-600 mb-4">
                    {integration.description}
                  </Typography>

                  {integration.connected && integration.lastSync && (
                    <Box>
                      <Divider className="mb-3" />
                      <Typography variant="caption" className="text-gray-500">
                        Last synced: {integration.lastSync}
                      </Typography>
                    </Box>
                  )}

                  {integration.connected && (
                    <Box className="mt-4">
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        Configure
                      </Button>
                    </Box>
                  )}

                  {!integration.connected && (
                    <Box className="mt-4">
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleToggleIntegration(integration.id)}
                      >
                        Connect
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Gmail Integration Details */}
        <Card>
          <CardContent className="p-6">
            <Typography variant="h6" className="font-semibold mb-4">
              Gmail Integration Setup
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Connect your Gmail account to automatically import transaction alerts from banks and financial institutions.
            </Typography>
            
            <Box className="bg-gray-50 p-4 rounded-lg mb-4">
              <Typography variant="subtitle2" className="font-medium mb-2">
                What we'll access:
              </Typography>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Read-only access to emails from financial institutions</li>
                <li>• Transaction alerts and notifications</li>
                <li>• Account balance updates</li>
                <li>• Payment confirmations</li>
              </ul>
            </Box>

            <Box className="bg-blue-50 p-4 rounded-lg">
              <Typography variant="subtitle2" className="font-medium mb-2 text-blue-800">
                Privacy & Security:
              </Typography>
              <Typography variant="body2" className="text-blue-700">
                We only read emails from known financial institutions and never access personal emails or sensitive information.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  )
}