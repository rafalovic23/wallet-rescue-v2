'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const router = useRouter()
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
      if (authenticated) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }, [login, router, authenticated])

  const handleLogout = useCallback(async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [logout, router])

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: authenticated,
    user,
    isReady: ready,
  }
}