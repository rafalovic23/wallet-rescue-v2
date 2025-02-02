// src/components/dashboard/WalletSetup.tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const WalletSetup = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [guardianId, setGuardianId] = useState('')
  const [guardians, setGuardians] = useState<string[]>([])

  const addGuardian = () => {
    if (guardianId && !guardians.includes(guardianId)) {
      setGuardians([...guardians, guardianId])
      setGuardianId('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/wallet/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: walletAddress,
          privateKey,
          guardians
        })
      })

      if (!response.ok) throw new Error('Failed to setup wallet')

      // Rediriger vers le dashboard ou afficher un message de succès
    } catch (error) {
      console.error('Setup failed:', error)
    }
  }

  return (
    <Card className="bg-secondary border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Setup Wallet Recovery</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Wallet Address */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full px-3 py-2 bg-secondary-dark border border-gray-800 rounded-md text-white"
              placeholder="0x..."
            />
          </div>

          {/* Private Key (en production, utilisez un meilleur UI pour la sécurité) */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Private Key
            </label>
            <input
              type="password"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="w-full px-3 py-2 bg-secondary-dark border border-gray-800 rounded-md text-white"
              placeholder="Enter your private key"
            />
          </div>

          {/* Guardian Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Add Guardian (Discord ID)
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={guardianId}
                onChange={(e) => setGuardianId(e.target.value)}
                className="flex-1 px-3 py-2 bg-secondary-dark border border-gray-800 rounded-md text-white"
                placeholder="Discord ID"
              />
              <button
                type="button"
                onClick={addGuardian}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md"
              >
                Add
              </button>
            </div>
          </div>

          {/* Guardian List */}
          {guardians.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Added Guardians:</h3>
              <div className="space-y-2">
                {guardians.map((id) => (
                  <div
                    key={id}
                    className="flex justify-between items-center p-2 bg-secondary-dark rounded-md"
                  >
                    <span className="text-white">{id}</span>
                    <button
                      type="button"
                      onClick={() => setGuardians(guardians.filter(g => g !== id))}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md mt-6"
          >
            Setup Recovery
          </button>
        </form>
      </CardContent>
    </Card>
  )
}