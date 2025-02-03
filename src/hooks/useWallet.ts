import { create } from 'zustand'

interface WalletState {
  wallet: {
    address: string;
    privateKey?: string;
  } | null;
  setWallet: (wallet: { address: string; privateKey?: string; } | null) => void;
}

export const useWallet = create<WalletState>((set) => ({
  wallet: null,
  setWallet: (wallet) => set({ wallet }),
}))