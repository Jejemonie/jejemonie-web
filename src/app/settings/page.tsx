'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Edit as EditIcon,
  Logout as LogoutIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material'
import { DashboardLayout } from '../../components/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyReports: false,
    budgetAlerts: true,
  })

  const handleProfileSave = () => {
    // TODO: Implement API call to update profile
    console.log('Saving profile:', profileData)
    setEditMode(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    console.log('Deleting account')
    setDeleteDialogOpen(false)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  return (
    <DashboardLayout>
      <Box className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Box>
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
            Settings
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Manage your account settings and preferences
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Profile Settings */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent className="p-6">
                <Box className="flex items-center justify-between mb-6">
                  <Typography variant="h6" className="font-semibold">
                    Profile Information
                  </Typography>
                  <IconButton onClick={() => setEditMode(!editMode)}>
                    <EditIcon />
                  </IconButton>
                </Box>

                <Box className="flex items-center gap-4 mb-6">
                  <Avatar className="w-16 h-16 bg-blue-500 text-xl">
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" className="font-medium">
                      {user?.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!editMode}
                    />
                  </Grid>
                </Grid>

                {editMode && (
                  <Box className="flex gap-3 mt-6">
                    <Button
                      variant="outlined"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleProfileSave}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent className="p-6">
                <Typography variant="h6" className="font-semibold mb-4">
                  Quick Actions
                </Typography>
                
                <Box className="space-y-3">
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<SecurityIcon />}
                    className="justify-start"
                  >
                    Change Password
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    className="justify-start"
                  >
                    Sign Out
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteDialogOpen(true)}
                    className="justify-start text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Delete Account
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Notification Settings */}
          <Grid item xs={12}>
            <Card>
              <CardContent className="p-6">
                <Box className="flex items-center gap-2 mb-6">
                  <NotificationsIcon className="text-blue-600" />
                  <Typography variant="h6" className="font-semibold">
                    Notification Preferences
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.emailAlerts}
                          onChange={(e) => handleNotificationChange('emailAlerts', e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" className="font-medium">
                            Email Alerts
                          </Typography>
                          <Typography variant="caption" className="text-gray-600">
                            Receive transaction alerts via email
                          </Typography>
                        </Box>
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.pushNotifications}
                          onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" className="font-medium">
                            Push Notifications
                          </Typography>
                          <Typography variant="caption" className="text-gray-600">
                            Get instant notifications on your device
                          </Typography>
                        </Box>
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.weeklyReports}
                          onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" className="font-medium">
                            Weekly Reports
                          </Typography>
                          <Typography variant="caption" className="text-gray-600">
                            Receive weekly spending summaries
                          </Typography>
                        </Box>
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.budgetAlerts}
                          onChange={(e) => handleNotificationChange('budgetAlerts', e.target.checked)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" className="font-medium">
                            Budget Alerts
                          </Typography>
                          <Typography variant="caption" className="text-gray-600">
                            Get notified when approaching budget limits
                          </Typography>
                        </Box>
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Security & Privacy */}
          <Grid item xs={12}>
            <Card>
              <CardContent className="p-6">
                <Typography variant="h6" className="font-semibold mb-4">
                  Security & Privacy
                </Typography>
                
                <Alert severity="info" className="mb-4">
                  Your data is encrypted and secure. We never share your personal information with third parties.
                </Alert>

                <Box className="space-y-4">
                  <Box>
                    <Typography variant="body2" className="font-medium mb-1">
                      Two-Factor Authentication
                    </Typography>
                    <Typography variant="caption" className="text-gray-600 mb-2 block">
                      Add an extra layer of security to your account
                    </Typography>
                    <Button variant="outlined" size="small">
                      Enable 2FA
                    </Button>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="body2" className="font-medium mb-1">
                      Data Export
                    </Typography>
                    <Typography variant="caption" className="text-gray-600 mb-2 block">
                      Download all your data in a portable format
                    </Typography>
                    <Button variant="outlined" size="small">
                      Export Data
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Delete Account Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="mb-4">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </Typography>
            <Alert severity="warning">
              This will permanently delete all your budgets, transactions, and account data.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteAccount} color="error" variant="contained">
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  )
}