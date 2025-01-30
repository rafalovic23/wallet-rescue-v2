// src/components/dashboard/WalletOverview.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Shield, CheckCircle } from 'lucide-react'

export const WalletOverview = () => {
  return (
    <Card className="bg-secondary border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Wallet Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary-light" />
              </div>
              <div>
                <p className="font-medium text-white">Recovery Status</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-sm text-gray-400">Protected</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary-dark rounded-lg">
              <p className="text-sm text-gray-400">Active Guardians</p>
              <p className="text-2xl font-bold text-white mt-1">3/3</p>
            </div>
            <div className="p-4 bg-secondary-dark rounded-lg">
              <p className="text-sm text-gray-400">Last Verified</p>
              <p className="text-2xl font-bold text-white mt-1">2d ago</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-400 mb-2">Recovery Address</p>
            <p className="text-sm font-mono text-white bg-secondary-dark p-2 rounded-lg break-all">
              0x1234...5678
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}