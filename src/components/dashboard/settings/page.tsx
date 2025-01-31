// src/app/dashboard/settings/page.tsx
'use client'

import { DashboardLayout } from '@/components/dashboard/layout'
import { WalletOverview } from '@/components/dashboard/WalletOverview'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        <div className="space-y-6">
          <WalletOverview />
          {/* Additional settings sections can be added here */}
        </div>
      </div>
    </DashboardLayout>
  )
}