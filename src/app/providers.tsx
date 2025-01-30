// src/app/providers.tsx
'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { PRIVY_CONFIG } from '@/config/privy'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_CONFIG.appId}
      config={PRIVY_CONFIG}
      onSuccess={(user) => {
        console.log(`User ${user.id} logged in!`)
      }}
    >
      {children}
    </PrivyProvider>
  )
}