// src/components/dashboard/GuardiansList.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users, CheckCircle, AlertCircle, UserPlus } from 'lucide-react'

const guardians = [
  {
    id: 1,
    name: 'Alex Thompson',
    platform: 'Discord',
    status: 'active',
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    platform: 'Discord',
    status: 'pending',
    lastActive: '1 day ago'
  },
  {
    id: 3,
    name: 'Michael Chen',
    platform: 'Discord',
    status: 'active',
    lastActive: '3 days ago'
  }
]

export const GuardiansList = () => {
  return (
    <Card className="bg-secondary border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-white text-lg font-medium">Guardians</CardTitle>
          <span className="text-sm text-gray-400">(3/3)</span>
        </div>
        <button className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded bg-primary/10 text-primary-light hover:bg-primary/20 transition-colors">
          <UserPlus className="h-4 w-4 mr-1" />
          Add Guardian
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {guardians.map((guardian) => (
            <div
              key={guardian.id}
              className="flex items-center justify-between p-3 bg-secondary-dark rounded-lg hover:bg-opacity-70 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary-light font-medium">
                    {guardian.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{guardian.name}</p>
                  <p className="text-xs text-gray-400">{guardian.platform}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {guardian.status === 'active' ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">Active</span>
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">Pending</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}