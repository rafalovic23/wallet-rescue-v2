// src/app/dashboard/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { DashboardLayout } from '@/components/dashboard/Layout'
import { WalletOverview } from '@/components/dashboard/WalletOverview'
import { GuardiansList } from '@/components/dashboard/GuardiansList'
import { RecoveryStatus } from '@/components/dashboard/RecoveryStatus'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'

export default function Dashboard() {
  const { isAuthenticated, isReady } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.push('/')
    }
  }, [isReady, isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <WalletOverview />
        <RecoveryStatus />
        <GuardiansList />
        <ActivityFeed />
      </div>
    </DashboardLayout>
  )
}