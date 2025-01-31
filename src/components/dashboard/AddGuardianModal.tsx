// src/components/dashboard/AddGuardianModal.tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { X, AlertCircle } from 'lucide-react'

interface AddGuardianModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (discordId: string) => Promise<void>;
  isLoading: boolean;
}

export const AddGuardianModal = ({ isOpen, onClose, onAdd }: AddGuardianModalProps) => {
  const [discordId, setDiscordId] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!discordId) {
      setError('Please enter a Discord ID')
      return
    }
    onAdd(discordId)
    setDiscordId('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-4">
        <Card className="bg-secondary border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Add Guardian</CardTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Discord ID
                </label>
                <input
                  type="text"
                  value={discordId}
                  onChange={(e) => setDiscordId(e.target.value)}
                  className="w-full px-3 py-2 bg-secondary-dark border border-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter Discord ID"
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
                >
                  Add Guardian
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}