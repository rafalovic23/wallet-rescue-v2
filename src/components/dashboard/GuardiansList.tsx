'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Users, CheckCircle, AlertCircle, UserPlus, Loader2 } from 'lucide-react'
import { AddGuardianModal } from './AddGuardianModal'

interface Guardian {
  id: string
  discordId: string
  status: 'PENDING' | 'ACTIVE' | 'REVOKED'
  dateAdded: string
}

export const GuardiansList = ({ walletAddress }: { walletAddress: string }) => {
  const [guardians, setGuardians] = useState<Guardian[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchGuardians()
  }, [walletAddress])

  const fetchGuardians = async () => {
    try {
      const response = await fetch(`/api/guardians?wallet=${walletAddress}`)
      if (!response.ok) throw new Error('Failed to fetch guardians')
      const data = await response.json()
      setGuardians(data.guardians)
    } catch (error) {
      setError('Failed to load guardians')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'PENDING':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <Card className="bg-secondary border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-white text-lg font-medium">Guardians</CardTitle>
          <span className="text-sm text-gray-400">
            ({guardians.filter(g => g.status === 'ACTIVE').length}/3)
          </span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded bg-primary/10 text-primary-light hover:bg-primary/20 transition-colors"
          disabled={guardians.length >= 3}
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Add Guardian
        </button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">{error}</div>
        ) : guardians.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Users className="h-12 w-12 mx-auto mb-3 text-gray-600" />
            <p>No guardians added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {guardians.map((guardian) => (
              <div
                key={guardian.id}
                className="flex items-center justify-between p-3 bg-secondary-dark rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {guardian.discordId}
                  </p>
                  <p className="text-xs text-gray-400">
                    Added {new Date(guardian.dateAdded).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(guardian.status)}
                  <span className="text-sm text-gray-400">
                    {guardian.status.charAt(0) + guardian.status.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <AddGuardianModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        walletAddress={walletAddress}
      />
    </Card>
  )
}