'use client'

import { useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Home,
  Wallet,
  Link,
  Receipt,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const authenticatedNavItems = [
  { label: 'Home', path: '/dashboard', icon: <Home className="h-4 w-4" /> },
  { label: 'Budget', path: '/budget', icon: <Wallet className="h-4 w-4" /> },
  { label: 'Connect', path: '/connect', icon: <Link className="h-4 w-4" /> },
  { label: 'Statement', path: '/statement', icon: <Receipt className="h-4 w-4" /> },
]

const publicNavItems = [
  { label: 'Personal', path: '/personal' },
  { label: 'Business', path: '/business' },
  { label: 'Help', path: '/help' },
]

export function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  
  const navItems = useMemo(() => {
    return user ? authenticatedNavItems : publicNavItems
  }, [user])

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
    handleClose()
  }

  const handleProfile = () => {
    router.push('/profile')
    handleClose()
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div onClick={handleDrawerToggle} className="text-center">
      <div className="flex justify-between items-center p-4">
        <h6 className="font-bold text-orange-500 text-lg">
          SmartBudget AI
        </h6>
        <button className="p-2">
          <X className="h-5 w-5" />
        </button>
      </div>
      <hr className="border-gray-200" />
      <div className="py-2">
        {navItems.map((item) => (
          <div key={item.label} className="px-4">
            <button 
              onClick={() => router.push(item.path)}
              className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg"
            >
              {item.label}
            </button>
          </div>
        ))}
        {!user && (
          <>
            <div className="px-4">
              <button 
                onClick={() => router.push('/login')}
                className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg"
              >
                Login
              </button>
            </div>
            <div className="px-4">
              <button 
                onClick={() => router.push('/signup')}
                className="w-full text-left py-3 px-4 hover:bg-gray-50 rounded-lg"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              {!user && (
                <button
                  onClick={handleDrawerToggle}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Brand */}
            <h1
              className="font-bold text-orange-500 cursor-pointer text-lg"
              onClick={() => router.push(user ? '/dashboard' : '/')}
            >
              SmartBudget AI
            </h1>

            {/* Navigation Items - Center (Desktop) */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex gap-8">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                      pathname === item.path 
                        ? 'text-orange-500 font-semibold' 
                        : 'text-gray-700 hover:text-orange-500'
                    }`}
                  >
                    {user && authenticatedNavItems.includes(item as any) && (item as any).icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Authenticated Navigation (Mobile) */}
            <div className="md:hidden">
              {user && (
                <div className="flex gap-4">
                  {authenticatedNavItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => router.push(item.path)}
                      className={`p-2 ${
                        pathname === item.path ? 'text-orange-500' : 'text-gray-700'
                      }`}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account - Right */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full text-sm font-medium"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </button>
                {anchorEl && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleProfile}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User className="h-4 w-4" />
                      Account
                    </button>
                    <button
                      onClick={() => { router.push('/settings'); handleClose() }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <hr className="border-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleDrawerToggle}></div>
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            {drawer}
          </div>
        </div>
      )}
      {/* Backdrop for dropdown */}
      {anchorEl && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={handleClose}
        ></div>
      )}
    </>
  )
}