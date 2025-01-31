// src/app/dashboard/activity/page.tsx
'use client'

import { DashboardLayout } from '@/components/dashboard/layout'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'

export default function ActivityPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white mb-6">Activity Log</h1>
        <ActivityFeed />
      </div>
    </DashboardLayout>
  )
}