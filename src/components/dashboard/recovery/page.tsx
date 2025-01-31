// src/app/dashboard/recovery/page.tsx
'use client'

import { DashboardLayout } from '@/components/dashboard/layout'
import { RecoveryStatus } from '@/components/dashboard/RecoveryStatus'
import { GuardiansList } from '@/components/dashboard/GuardiansList'

export default function RecoveryPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white mb-6">Recovery Setup</h1>
        <div className="space-y-6">
          <RecoveryStatus />
          <GuardiansList />
        </div>
      </div>
    </DashboardLayout>
  )
}