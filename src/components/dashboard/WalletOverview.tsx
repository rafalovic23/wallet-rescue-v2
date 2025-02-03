'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Shield, Copy, CheckCircle } from 'lucide-react'
import { useWallet } from '@/hooks/useWallet'

export const WalletOverview = () => {
  const { wallet, setWallet } = useWallet()
  const [newWalletAddress, setNewWalletAddress] = useState('')
  const [newPrivateKey, setNewPrivateKey] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/wallet/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: newWalletAddress,
          privateKey: newPrivateKey,
        }),
      })

      // Vérifions si la réponse n'est pas ok
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to setup wallet')
      }

      // Si tout va bien, mettons à jour le wallet
      setWallet({
        address: newWalletAddress,
      })
    } catch (error) {
      console.error('Error setting up wallet:', error)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!wallet) {
    return (
      <Card className="bg-secondary border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Add Your Wallet
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
                value={newWalletAddress}
                onChange={(e) => setNewWalletAddress(e.target.value)}
                className="w-full px-3 py-2 bg-secondary-dark border border-gray-800 rounded-md text-white"
                placeholder="0x..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Private Key
              </label>
              <input
                type="password"
                value={newPrivateKey}
                onChange={(e) => setNewPrivateKey(e.target.value)}
                className="w-full px-3 py-2 bg-secondary-dark border border-gray-800 rounded-md text-white"
                placeholder="Enter your private key"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
            >
              Set Up Wallet Recovery
            </button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-secondary border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Wallet Overview
          </div>
          <div className="text-sm font-normal text-green-500 flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Protected
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Recovery Address</p>
            <div className="flex items-center justify-between p-2 bg-secondary-dark rounded-lg">
              <code className="text-sm text-white">
                {wallet.address}
              </code>
              <button
                onClick={() => copyToClipboard(wallet.address)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title={isCopied ? 'Copied!' : 'Copy address'}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary-dark rounded-lg">
              <p className="text-sm text-gray-400">Recovery Status</p>
              <p className="mt-1 text-xl font-semibold text-white">Active</p>
            </div>
            <div className="p-4 bg-secondary-dark rounded-lg">
              <p className="text-sm text-gray-400">Last Verified</p>
              <p className="mt-1 text-xl font-semibold text-white">2d ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}