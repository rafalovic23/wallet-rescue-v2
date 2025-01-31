// src/components/dashboard/GuardiansList.tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { 
  Users, 
  CheckCircle, 
  AlertCircle, 
  UserPlus, 
  Trash2,
  RefreshCw,
  Clock 
} from 'lucide-react'
import { useGuardiansStore } from '@/store/useGuardiansStore'
import { AddGuardianModal } from './AddGuardianModal'

export const GuardiansList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { 
    guardians, 
    addGuardian, 
    removeGuardian, 
    updateGuardianStatus,
    canAddMoreGuardians,
    isLoading,
    error 
  } = useGuardiansStore()

  const handleAddGuardian = async (discordId: string) => {
    await addGuardian(discordId)
    setIsModalOpen(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'pending':
        return 'Pending'
      case 'revoked':
        return 'Revoked'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500'
      case 'pending':
        return 'text-yellow-500'
      case 'revoked':
        return 'text-red-500'
      default:
        return 'text-gray-400'
    }
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
              disabled={isLoading}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded bg-primary/10 text-primary-light hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add Guardian
                </>
              )}
            </button>
          )}
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {guardians.map((guardian) => (
              <div
                key={guardian.id}
                className="flex items-center justify-between p-3 bg-secondary-dark rounded-lg hover:bg-opacity-70 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {guardian.avatar ? (
                      <img 
                        src={`https://cdn.discordapp.com/avatars/${guardian.discordId}/${guardian.avatar}.png`}
                        alt={guardian.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-primary-light font-medium">
                        {guardian.username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{guardian.username}</p>
                    <p className="text-xs text-gray-400">Discord ID: {guardian.discordId}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className={`flex items-center ${getStatusColor(guardian.status)}`}>
                    {getStatusIcon(guardian.status)}
                    <span className="text-xs ml-1">{getStatusText(guardian.status)}</span>
                  </div>

                  {guardian.status !== 'active' && (
                    <button
                      onClick={() => removeGuardian(guardian.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {guardians.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No guardians added yet</p>
                <p className="text-sm text-gray-500 mt-1">
                  Add guardians to secure your wallet recovery
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

 

      <AddGuardianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddGuardian}
        isLoading={isLoading}  // Ajout de cette prop
      />
    </>
  )
}