'use client'

import { useRouter } from 'next/navigation'
import { TrendingUp, BarChart3 } from 'lucide-react'

export function Hero() {
  const router = useRouter()

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-8xl sm:text-6xl font-bold text-gray-900 mb-6">
              Your Budget on Autopilot <br></br>
              <span className="text-4xl sm:text-4xl text-orange-500 ">powered by AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Take control of your finances with intelligent insights, automated
              categorization, and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => router.push('/signup')}
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 px-8 rounded-lg font-medium transition-colors"
              >
                Get Started Free
              </button>
              <button
                onClick={() => router.push('/login')}
                className="border border-orange-500 text-orange-500 hover:bg-orange-50 text-lg py-3 px-8 rounded-lg font-medium transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Monthly Overview
                  </h3>
                  <span className="text-sm text-orange-600 font-medium">
                    December 2024
                  </span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-24 w-24 text-orange-500 opacity-50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Savings
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      +12%
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">
                        AI Tips
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      3 New
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-orange-600 rounded-full opacity-10"></div>
            <div className="absolute -top-6 -left-6 h-16 w-16 bg-green-600 rounded-full opacity-10"></div>
          </div>
        </div>
      </div>
    </div>
  )
}