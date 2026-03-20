"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/app/utils/itemList";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className=" w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between font-montserrat z-50 text-nowrap">
        {/* Left: Logo + Nav Links in pill */}
        <div className="hidden md:flex items-center gap-8 bg-white shadow rounded-full px-6 py-3 ">
          <a href="/" className="flex items-center">
            <img src="/logo_w_icon_orange.svg" alt="Manayja" className="h-10" />
          </a>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className=" text-sm font-medium text-[#021A24] hover:-translate-y-1 ease-in-out transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between w-full shadow rounded-full px-6 py-3">
          {/* Mobile: Logo */}
          <div className="">
            <img src="/logo_w_icon_orange.svg" alt="Manayja" className="h-9" />
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-5 py-2.5 bg-[#F87315] text-white text-sm font-semibold rounded-full hover:bg-[#F87315]/70 hover:text-white hover:-translate-y-1 ease-in-out transition-all duration-300">
            Sign Up
          </button>
          <button className="px-5 py-2.5 shadow text-[#021A24] text-sm font-medium rounded-full hover:-translate-y-1 ease-in-out transition-all duration-300 ">
            Sign in
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileOpen(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <img
                  src="/manayjalogo.svg"
                  alt="Manayja"
                  width="80"
                  height="28"
                  className="h-7"
                />
                <button onClick={() => setMobileOpen(false)} className="p-2">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
                  >
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
  );
}
