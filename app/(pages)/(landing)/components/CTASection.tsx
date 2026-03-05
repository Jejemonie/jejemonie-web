'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  const router = useRouter()

  return (
    <div className="bg-orange py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Start Your Financial Journey Today
            </h2>
            <p className="text-xl text-accent mb-8">
              Join thousands of users who have transformed their financial
              health with our AI-powered budget tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => router.push('/signup')}
                className="bg-white text-orange hover:bg-accent text-lg py-3 px-8 rounded-lg font-medium transition-colors"
              >
                Create Free Account
              </button>
              <button
                onClick={() => router.push('/login')}
                className="bg-primary text-white hover:opacity-90 text-lg py-3 px-8 rounded-lg font-medium transition-opacity flex items-center justify-center"
              >
                <span>Sign In</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                What Our Users Say
              </h3>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  "The AI recommendations helped me save an extra $350 per month
                  that I didn't know was possible!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
                    JD
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Jamie Doe
                    </p>
                    <p className="text-xs text-gray-500">
                      Personal Finance User
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  "As a small business owner, this platform has completely
                  transformed how I manage my company's finances."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
                    TS
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Taylor Smith
                    </p>
                    <p className="text-xs text-gray-500">Business Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}