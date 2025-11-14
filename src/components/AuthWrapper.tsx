'use client'

import { useState } from 'react'

export function AuthWrapper() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* This component can be simplified or removed since login/signup are separate pages */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">SmartBudget AI</h1>
          <p className="text-gray-600">Please use the login or signup pages directly.</p>
        </div>
      </div>
    </div>
  )
}