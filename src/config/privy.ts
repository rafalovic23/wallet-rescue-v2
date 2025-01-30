// src/config/privy.ts

export const PRIVY_CONFIG = {
    // Remplacez par votre App ID from Privy Dashboard
    appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID as string,
    
    // Configuration de l'interface utilisateur
    appearance: {
      theme: 'dark',
      accentColor: '#4F46E5', // Correspond à notre primary color
      showWalletLoginFirst: true,
    },
  
    // Configuration des méthodes de login
    loginMethods: ['email', 'twitter', 'google'],
  }