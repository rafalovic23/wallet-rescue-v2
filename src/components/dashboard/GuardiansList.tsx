// src/components/dashboard/GuardiansList.tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users, CheckCircle, AlertCircle, UserPlus, Trash2 } from 'lucide-react'
import { useGuardiansStore } from '@/store/useGuardiansStore'
import { AddGuardianModal } from './AddGuardianModal'

export const GuardiansList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { guardians, addGuardian, removeGuardian, canAddMoreGuardians } = useGuardiansStore()

  const handleAddGuardian = (discordId: string) => {
    addGuardian({
      name: `Guardian ${guardians.length + 1}`, // Temporaire, à remplacer par le vrai nom Discord
      address: discordId,
      status: 'pending',
      platform: 'discord',
    })
  }

  return (
    <>
      <Card className="bg-secondary border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-white text-lg font-medium">Guardians</CardTitle>
            <span className="text-sm text-gray-400">
              ({guardians.length}/3)
            </span>
          </div>
          {canAddMoreGuardians() && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded bg-primary/10 text-primary-light hover:bg-primary/20 transition-colors"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Add Guardian
            </button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {guardians.map((guardian) => (
              <div
                key={guardian.id}
                className="flex items-center justify-between p-3 bg-secondary-dark rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary-light font-medium">
                      {guardian.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{guardian.name}</p>
                    <p className="text-xs text-gray-400">Discord ID: {guardian.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
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
                  <button
                    onClick={() => removeGuardian(guardian.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {guardians.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-400">No guardians added yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddGuardianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddGuardian}
      />
    </>
  )
}