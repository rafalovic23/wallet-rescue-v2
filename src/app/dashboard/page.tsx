// src/app/dashboard/page.tsx
'use client'

import { useAuth } from '@/hooks/useAuth'
import { DashboardLayout } from '@/components/dashboard/layout'
import { WalletOverview } from '@/components/dashboard/WalletOverview'
import { GuardiansList } from '@/components/dashboard/GuardiansList'
import { RecoveryStatus } from '@/components/dashboard/RecoveryStatus'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WalletOverview />
          <RecoveryStatus />
          <GuardiansList />
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  )
}