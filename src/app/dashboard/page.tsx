'use client'

import { DashboardLayout } from '@/components/dashboard/layout'
import { WalletOverview } from '@/components/dashboard/WalletOverview'
import { GuardiansList } from '@/components/dashboard/GuardiansList'
import { RecoveryStatus } from '@/components/dashboard/RecoveryStatus'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { useWallet } from '@/hooks/useWallet' // nous devrons créer ce hook

export default function DashboardPage() {
  const { wallet } = useWallet()

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WalletOverview />
          <RecoveryStatus />
          {wallet && <GuardiansList walletAddress={wallet.address} />}
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  )
}