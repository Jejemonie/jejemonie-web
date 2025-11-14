'use client'

import React, { useState } from 'react'
import {
  MoonIcon,
  SunIcon,
  BellIcon,
  GlobeIcon,
  ShieldIcon,
  KeyIcon,
  TrashIcon,
  LogOutIcon,
  CheckIcon,
} from 'lucide-react'

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [language, setLanguage] = useState('english')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  })

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your app preferences and account settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              {theme === 'light' ? (
                <SunIcon className="h-5 w-5 mr-2 text-yellow-500" />
              ) : (
                <MoonIcon className="h-5 w-5 mr-2 text-blue-500" />
              )}
              Appearance
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center p-4 border-2 rounded-lg transition-all ${
                      theme === 'light'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <SunIcon className="h-5 w-5 mr-2" />
                    <span className="font-medium">Light</span>
                    {theme === 'light' && (
                      <CheckIcon className="h-5 w-5 ml-2 text-orange-500" />
                    )}
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-center p-4 border-2 rounded-lg transition-all ${
                      theme === 'dark'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MoonIcon className="h-5 w-5 mr-2" />
                    <span className="font-medium">Dark</span>
                    {theme === 'dark' && (
                      <CheckIcon className="h-5 w-5 ml-2 text-orange-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BellIcon className="h-5 w-5 mr-2 text-orange-500" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-xs text-gray-600">
                    Receive budget alerts via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.email}
                    onChange={() => handleNotificationToggle('email')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Push Notifications
                  </p>
                  <p className="text-xs text-gray-600">
                    Receive push notifications on your device
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.push}
                    onChange={() => handleNotificationToggle('push')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    SMS Notifications
                  </p>
                  <p className="text-xs text-gray-600">
                    Receive text message notifications
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.sms}
                    onChange={() => handleNotificationToggle('sms')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Budget Tips & Insights
                  </p>
                  <p className="text-xs text-gray-600">
                    Receive AI-powered financial insights
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications.marketing}
                    onChange={() => handleNotificationToggle('marketing')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GlobeIcon className="h-5 w-5 mr-2 text-orange-500" />
              Language & Region
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option value="usd">USD ($)</option>
                  <option value="eur">EUR (€)</option>
                  <option value="gbp">GBP (£)</option>
                  <option value="jpy">JPY (¥)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ShieldIcon className="h-5 w-5 mr-2 text-orange-500" />
              Privacy & Security
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <KeyIcon className="h-5 w-5 mr-3 text-gray-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      Change Password
                    </p>
                    <p className="text-xs text-gray-600">
                      Update your password
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <ShieldIcon className="h-5 w-5 mr-3 text-gray-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-gray-600">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <ShieldIcon className="h-5 w-5 mr-3 text-gray-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      Privacy Settings
                    </p>
                    <p className="text-xs text-gray-600">
                      Manage your data and privacy
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Account Management
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <LogOutIcon className="h-5 w-5 mr-3 text-gray-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Log Out</p>
                    <p className="text-xs text-gray-600">
                      Sign out of your account
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                <div className="flex items-center">
                  <TrashIcon className="h-5 w-5 mr-3 text-red-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-red-600">
                      Delete Account
                    </p>
                    <p className="text-xs text-red-600">
                      Permanently delete your account
                    </p>
                  </div>
                </div>
                <span className="text-red-400">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}