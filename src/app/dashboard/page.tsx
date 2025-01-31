'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { DashboardLayout } from '@/components/dashboard/layout'
import { WalletOverview } from '@/components/dashboard/WalletOverview'
// On retire temporairement ces composants jusqu'à ce qu'ils soient créés
/* import { GuardiansList } from '@/components/dashboard/GuardiansList'
import { RecoveryStatus } from '@/components/dashboard/RecoveryStatus'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'*/

export default function DashboardPage() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WalletOverview />
          {/* On les ajoutera plus tard
          <RecoveryStatus />
          <GuardiansList />
          <ActivityFeed /> */}
        </div>
      </div>
    </DashboardLayout>
  )
}