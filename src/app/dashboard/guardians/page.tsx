// src/app/dashboard/guardians/page.tsx
'use client'

import { DashboardLayout } from '@/components/dashboard/layout'
import { GuardiansList } from '@/components/dashboard/GuardiansList'

export default function GuardiansPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white mb-6">Guardians Management</h1>
        <GuardiansList />
      </div>
    </DashboardLayout>
  )
}