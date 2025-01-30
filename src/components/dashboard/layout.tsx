'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import {
  Home,
  Shield,
  Users,
  Activity,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'

const sidebarLinks = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Recovery Setup', href: '/dashboard/recovery', icon: Shield },
  { name: 'Guardians', href: '/dashboard/guardians', icon: Users },
  { name: 'Activity', href: '/dashboard/activity', icon: Activity },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout, user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-secondary-dark">
      {/* Sidebar - Desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-800 bg-secondary pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <span className="text-xl font-bold text-white">Wallet Rescue</span>
          </div>
          <div className="mt-8 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 px-2">
              {sidebarLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-primary/10 hover:text-primary-light"
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-800 p-4">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.email}</p>
                <button
                  onClick={logout}
                  className="flex items-center text-sm font-medium text-gray-400 hover:text-primary-light"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="fixed inset-0 z-40 flex">
          <div
            className={`fixed inset-0 bg-black bg-opacity-75 transition-opacity ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            className={`fixed inset-y-0 left-0 flex w-64 flex-col bg-secondary transform transition-transform ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
              <span className="text-xl font-bold text-white">Wallet Rescue</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4 space-y-1">
                {sidebarLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-primary/10 hover:text-primary-light"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 md:hidden">
        <div className="flex flex-1 justify-between px-4 bg-secondary border-b border-gray-800">
          <div className="flex flex-1 items-center">
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4">
              <span className="text-xl font-bold text-white">Wallet Rescue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}