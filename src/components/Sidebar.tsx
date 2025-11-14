'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Home,
  Wallet,
  Link,
  Settings,
  Menu,
  ChevronLeft
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const DRAWER_WIDTH = 280
const COLLAPSED_WIDTH = 72

interface NavItem {
  text: string
  icon: React.ReactNode
  path: string
}

const navItems: NavItem[] = [
  { text: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/dashboard' },
  { text: 'Budget', icon: <Wallet className="h-5 w-5" />, path: '/budget' },
  { text: 'Integrations', icon: <Link className="h-5 w-5" />, path: '/integrations' },
]

const bottomNavItems: NavItem[] = [
  { text: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sidebar-collapsed') === 'true'
    }
    return false
  })
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', newCollapsed.toString())
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-gray-50 border-r border-gray-200 transition-all duration-300 z-40 ${
        collapsed ? 'w-18' : 'w-70'
      }`}
      style={{ width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 min-h-[64px]">
        {!collapsed && (
          <h1 className="text-lg font-bold text-orange-500">
            SmartBudget AI
          </h1>
        )}
        <button onClick={toggleCollapsed} className="p-2 hover:bg-gray-100 rounded-lg">
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* Navigation Items */}
      <div className="flex-1 px-2 py-2">
        {navItems.map((item) => (
          <div key={item.text} className="mb-1">
            <button
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                pathname === item.path
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={collapsed ? item.text : ''}
            >
              <span className={pathname === item.path ? 'text-orange-600' : 'text-gray-600'}>
                {item.icon}
              </span>
              {!collapsed && <span className="text-sm font-medium">{item.text}</span>}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div>
        <hr className="border-gray-200" />
        <div className="px-2 py-2">
          {bottomNavItems.map((item) => (
            <div key={item.text} className="mb-1">
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  pathname === item.path
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={collapsed ? item.text : ''}
              >
                <span className={pathname === item.path ? 'text-orange-600' : 'text-gray-600'}>
                  {item.icon}
                </span>
                {!collapsed && <span className="text-sm font-medium">{item.text}</span>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}