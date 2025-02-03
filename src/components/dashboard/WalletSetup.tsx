// components/dashboard/WalletSetup.tsx
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Shield, Copy } from 'lucide-react'

export const WalletSetup = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/wallet/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, privateKey }),
      })

      if (!response.ok) throw new Error('Failed to register wallet')
      
      // Réinitialiser le formulaire
      setWalletAddress('')
      setPrivateKey('')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <Card className="bg-secondary border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Register Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Private Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="w-full px-3 py-2 bg-secondary-dark border border-gray-800 rounded-md text-white pr-10"
                placeholder="Enter your private key"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
          >
            Register Wallet
          </button>
        </form>
      </CardContent>
    </Card>
  )
}