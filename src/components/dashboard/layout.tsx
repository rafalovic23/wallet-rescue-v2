'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import {
  Home,
  Shield,
  Users,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  BellRing
} from 'lucide-react'

const sidebarLinks = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Recovery Setup', href: '/dashboard/recovery', icon: Shield },
  { name: 'Guardians', href: '/dashboard/guardians', icon: Users },
  { name: 'Activity', href: '/dashboard/activity', icon: Activity },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

type UserSectionProps = {
  mobile?: boolean;
}

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout, user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsNotificationsOpen(false)
  }, [pathname])

  const SidebarContent = () => (
    <nav className="flex-1 space-y-1 px-2">
      {sidebarLinks.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
            pathname === item.href
              ? 'bg-primary/20 text-primary-light'
              : 'text-gray-300 hover:bg-primary/10 hover:text-primary-light'
          }`}
        >
          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
          {item.name}
        </Link>
      ))}
    </nav>
  )

  const UserSection = ({ mobile = false }: UserSectionProps) => (
    <div className="flex flex-shrink-0 border-t border-gray-800 p-4">
      <div className="flex items-center w-full">
        <div className={`flex flex-col ${mobile ? 'w-full' : ''}`}>
          <p className="text-sm font-medium text-white truncate">
          </p>
          <button
            onClick={logout}
            className="mt-1 flex items-center text-sm text-gray-400 hover:text-primary-light transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-secondary-dark">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-800 bg-secondary pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <span className="text-xl font-bold text-white">Wallet Rescue</span>
          </div>
          <div className="mt-8 flex flex-1 flex-col">
            <SidebarContent />
          </div>
          <UserSection />
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-20 md:hidden">
        <div className="flex h-16 items-center justify-between bg-secondary px-4 border-b border-gray-800">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>

          <span className="text-lg font-bold text-white">Wallet Rescue</span>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative text-gray-400 hover:text-white p-2"
            >
              <BellRing className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center text-xs text-white">
                2
              </span>
            </button>

            {isNotificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-secondary border border-gray-800 rounded-md shadow-lg z-40">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white mb-2">Notifications</h3>
                    <div className="space-y-2">
                      <div className="p-2 hover:bg-secondary-dark rounded-md transition-colors">
                        <p className="text-sm text-white">Guardian Alex validated your recovery setup</p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                      <div className="p-2 hover:bg-secondary-dark rounded-md transition-colors">
                        <p className="text-sm text-white">Monthly security check reminder</p>
                        <p className="text-xs text-gray-400">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-40 w-64 bg-secondary transform transition-transform duration-300 ease-in-out">
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
              <span className="text-lg font-bold text-white">Wallet Rescue</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col h-[calc(100%-4rem)]">
              <div className="flex-1 overflow-y-auto py-4">
                <SidebarContent />
              </div>
              <UserSection mobile />
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <div className="md:pl-64">
        <main className="min-h-[calc(100vh-4rem)] py-6">
          {children}
        </main>
      </div>
    </div>
  )
}