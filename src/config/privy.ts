// src/config/privy.ts
export const PRIVY_CONFIG = {
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID as string,
  
  appearance: {
    theme: 'dark' as const,
    accentColor: '#4F46E5',
    showWalletLoginFirst: false,
  },

  // On change pour Discord
  loginMethods: ['discord'],
}