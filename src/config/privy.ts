import { PrivyClientConfig } from '@privy-io/react-auth'

export const PRIVY_CONFIG: Partial<PrivyClientConfig> = {
  appearance: {
    theme: 'dark' as const,
    accentColor: '#4F46E5',
    showWalletLoginFirst: false,
  },
  loginMethods: ['twitter'],
}