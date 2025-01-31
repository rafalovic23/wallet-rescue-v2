// src/components/dashboard/GuardianInvite.tsx
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Copy, Check } from 'lucide-react'

export const GuardianInvite = () => {
  const [copied, setCopied] = useState(false)
  const inviteLink = `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=bot&permissions=0`

  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-secondary border-gray-800 mt-4">
      <CardHeader>
        <CardTitle className="text-white text-lg font-medium">Invite Guardian Bot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-400">
            Share this link with your potential guardian to let them join your recovery system:
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="flex-1 px-3 py-2 bg-secondary-dark border border-gray-800 rounded-md text-white"
            />
            <button
              onClick={copyLink}
              className="p-2 hover:bg-primary/10 rounded-md transition-colors"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}