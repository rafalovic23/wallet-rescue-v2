// src/components/dashboard/RecoveryStatus.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Shield, Clock, CheckCircle } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Social Recovery Setup',
    description: 'Backup system configured with Discord authentication',
    status: 'complete',
  },
  {
    id: 2,
    title: 'Guardians Assignment',
    description: '3 of 3 guardians have confirmed',
    status: 'complete',
  },
  {
    id: 3,
    title: 'Recovery Time Lock',
    description: '24-hour timelock period set for added security',
    status: 'complete',
  }
]

export const RecoveryStatus = () => {
  return (
    <Card className="bg-secondary border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-white text-lg font-medium">Recovery Setup Status</CardTitle>
        <Shield className="h-5 w-5 text-primary-light" />
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-800" />

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.id} className="relative flex items-start">
                <div 
                  className={`absolute left-0 mt-1.5 h-8 w-8 rounded-full border-2 flex items-center justify-center
                    ${step.status === 'complete' 
                      ? 'bg-primary/10 border-primary-light' 
                      : 'bg-secondary-dark border-gray-700'}`}
                >
                  {step.status === 'complete' ? (
                    <CheckCircle className="h-4 w-4 text-primary-light" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                </div>

                <div className="ml-12">
                  <h3 className="text-sm font-medium text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Complete Message */}
        <div className="mt-6 flex items-center justify-center p-3 bg-primary/5 rounded-lg border border-primary/20">
          <CheckCircle className="h-5 w-5 text-primary-light mr-2" />
          <span className="text-sm text-primary-light">Recovery system fully configured</span>
        </div>
      </CardContent>
    </Card>
  )
}