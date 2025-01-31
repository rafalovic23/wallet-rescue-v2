// src/components/dashboard/ActivityFeed.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Activity, Shield, UserPlus, RefreshCcw } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'guardian_added',
    description: 'New guardian Alex Thompson added',
    timestamp: '2 hours ago',
    icon: UserPlus,
  },
  {
    id: 2,
    type: 'recovery_check',
    description: 'Recovery configuration verified',
    timestamp: '1 day ago',
    icon: Shield,
  },
  {
    id: 3,
    type: 'wallet_update',
    description: 'Backup address updated',
    timestamp: '3 days ago',
    icon: RefreshCcw,
  }
]

export const ActivityFeed = () => {
  return (
    <Card className="bg-secondary border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-white text-lg font-medium">Recent Activity</CardTitle>
        <Activity className="h-5 w-5 text-primary-light" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex space-x-3 p-3 bg-secondary-dark rounded-lg hover:bg-opacity-70 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <activity.icon className="h-4 w-4 text-primary-light" />
                </div>
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="text-sm text-white">{activity.description}</p>
                  <p className="text-xs text-gray-400">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full py-2 text-sm text-gray-400 hover:text-white transition-colors">
          View all activity
        </button>
      </CardContent>
    </Card>
  )
}