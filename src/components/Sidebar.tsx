'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Avatar,
  Typography,
  Tooltip
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  AccountBalance as BudgetIcon,
  Link as IntegrationIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'

const DRAWER_WIDTH = 280
const COLLAPSED_WIDTH = 72

interface NavItem {
  text: string
  icon: React.ReactNode
  path: string
}

const navItems: NavItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Budget', icon: <BudgetIcon />, path: '/budget' },
  { text: 'Integrations', icon: <IntegrationIcon />, path: '/integrations' },
]

const bottomNavItems: NavItem[] = [
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          borderRight: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
        },
      }}
    >
      {/* Header */}
      <Box className="flex items-center justify-between p-4 min-h-[64px]">
        {!collapsed && (
          <Typography variant="h6" className="font-bold text-blue-600">
            SmartBudget AI
          </Typography>
        )}
        <IconButton onClick={() => setCollapsed(!collapsed)} size="small">
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* User Profile */}
      <Box className="p-4">
        <Box className="flex items-center gap-3">
          <Avatar className="bg-blue-500">
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          {!collapsed && (
            <Box>
              <Typography variant="subtitle2" className="font-medium">
                {user?.name}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {user?.email}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Navigation Items */}
      <List className="flex-1 px-2">
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding className="mb-1">
            <Tooltip title={collapsed ? item.text : ''} placement="right">
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                className={`rounded-lg mx-1 ${
                  pathname === item.path
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100'
                }`}
                sx={{ minHeight: 48 }}
              >
                <ListItemIcon
                  className={pathname === item.path ? 'text-blue-600' : 'text-gray-600'}
                  sx={{ minWidth: collapsed ? 'auto' : 40 }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      {/* Bottom Navigation */}
      <Box>
        <Divider />
        <List className="px-2 pb-2">
          {bottomNavItems.map((item) => (
            <ListItem key={item.text} disablePadding className="mb-1">
              <Tooltip title={collapsed ? item.text : ''} placement="right">
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  className={`rounded-lg mx-1 ${
                    pathname === item.path
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100'
                  }`}
                  sx={{ minHeight: 48 }}
                >
                  <ListItemIcon
                    className={pathname === item.path ? 'text-blue-600' : 'text-gray-600'}
                    sx={{ minWidth: collapsed ? 'auto' : 40 }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.text} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}