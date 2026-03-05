'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = ['Budget', 'Why Us?', 'FAQs', 'Contact']

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="w-full px-6 py-4 flex items-center justify-between">
        {/* Left: Logo + Nav Links in pill */}
        <div className="hidden md:flex items-center gap-8 bg-white rounded-2xl px-6 py-3 shadow-sm">
          <a href="/" className="flex items-center">
            <img src="/manayjalogo.svg" alt="Manayja" width="120" height="40" className="h-10" />
          </a>

          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile: Logo */}
        <div className="md:hidden flex items-center">
          <img src="/manayjalogo.svg" alt="Manayja" width="100" height="36" className="h-9" />
        </div>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition-colors duration-200">
            Sign Up
          </button>
          <button className="px-5 py-2.5 border-2 border-gray-900 text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200">
            Sign in
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-900">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <img src="/manayjalogo.svg" alt="Manayja" width="80" height="28" className="h-7" />
                <button onClick={() => setMobileOpen(false)} className="p-2">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                {navItems.map((item) => (
                  <a key={item} href="#" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">
                    {item}
                  </a>
                ))}
                <div className="pt-4 space-y-3">
                  <button className="w-full px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full">
                    Sign Up
                  </button>
                  <button className="w-full px-5 py-2.5 border-2 border-gray-900 text-gray-900 text-sm font-semibold rounded-full">
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
