'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { login, logout, isAuthenticated, user, isReady } = useAuth()

  return (
    <header className="fixed w-full bg-secondary/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/images/logo.svg" 
              alt="Wallet Rescue Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">Wallet Rescue</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How it Works
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary-light transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
                  disabled={!isReady}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
                disabled={!isReady}
              >
                Connect Wallet
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6 text-gray-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="#features" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-primary-light hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
                    disabled={!isReady}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    login()
                    setIsMenuOpen(false)
                  }}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
                  disabled={!isReady}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}