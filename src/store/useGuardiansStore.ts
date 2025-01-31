// src/store/useGuardiansStore.ts
import { create } from 'zustand'

export type Guardian = {
  id: string
  name: string
  address: string // Discord ID initialement
  email?: string
  status: 'pending' | 'active' | 'revoked'
  dateAdded: Date
  lastActive?: Date
  platform: 'discord'
}

interface GuardiansStore {
  guardians: Guardian[]
  addGuardian: (guardian: Omit<Guardian, 'id' | 'dateAdded'>) => void
  removeGuardian: (id: string) => void
  updateGuardianStatus: (id: string, status: Guardian['status']) => void
  // Maximum 3 guardians
  canAddMoreGuardians: () => boolean
}

export const useGuardiansStore = create<GuardiansStore>((set, get) => ({
  guardians: [],
  addGuardian: (guardian) => {
    if (!get().canAddMoreGuardians()) return
    set((state) => ({
      guardians: [
        ...state.guardians,
        {
          ...guardian,
          id: crypto.randomUUID(),
          dateAdded: new Date(),
        },
      ],
    }))
  },
  removeGuardian: (id) => {
    set((state) => ({
      guardians: state.guardians.filter((g) => g.id !== id),
    }))
  },
  updateGuardianStatus: (id, status) => {
    set((state) => ({
      guardians: state.guardians.map((g) =>
        g.id === id ? { ...g, status, lastActive: new Date() } : g
      ),
    }))
  },
  canAddMoreGuardians: () => {
    const activeGuardians = get().guardians.filter(
      (g) => g.status === 'active' || g.status === 'pending'
    )
    return activeGuardians.length < 3
  },
}))