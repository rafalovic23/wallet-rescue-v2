'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { PRIVY_CONFIG } from '@/config/privy'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={PRIVY_CONFIG}
    >
      {children}
    </PrivyProvider>
  )
}