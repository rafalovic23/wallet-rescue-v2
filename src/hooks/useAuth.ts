'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useCallback } from 'react'

export const useAuth = () => {
  const privy = usePrivy()
  const {
    login,
    logout,
    authenticated,
    user,
    ready,
  } = privy

  const handleLogin = useCallback(async () => {
    try {
      await login()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }, [login])

  const handleLogout = useCallback(async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [logout])

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: authenticated,
    user,
    isReady: ready,
  }
}