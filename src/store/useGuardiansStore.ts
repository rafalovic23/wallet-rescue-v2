// src/store/useGuardiansStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Guardian {
  id: string
  discordId: string
  username: string
  avatar: string | null
  status: 'pending' | 'active' | 'revoked'
  dateAdded: Date
  lastActive?: Date
}

type GuardiansStore = {
  guardians: Guardian[]
  isLoading: boolean
  error: string | null
  addGuardian: (discordId: string) => Promise<void>
  removeGuardian: (id: string) => void
  updateGuardianStatus: (id: string, status: Guardian['status']) => void
  canAddMoreGuardians: () => boolean
}

const fetchDiscordUser = async (discordId: string) => {
  // Simulation d'un appel API - À remplacer par votre vraie logique
  return {
    id: discordId,
    username: `User${discordId}`,
    avatar: null
  }
}

export const useGuardiansStore = create<GuardiansStore>()((set, get) => ({
  guardians: [],
  isLoading: false,
  error: null,

  addGuardian: async (discordId: string) => {
    try {
      set({ isLoading: true, error: null })

      // Vérifier si le guardian existe déjà
      if (get().guardians.some(g => g.discordId === discordId)) {
        throw new Error('This guardian is already added')
      }

      // Fetch Discord user info
      const userInfo = await fetchDiscordUser(discordId)

      set((state) => ({
        guardians: [
          ...state.guardians,
          {
            id: crypto.randomUUID(),
            discordId,
            username: userInfo.username,
            avatar: userInfo.avatar,
            status: 'pending',
            dateAdded: new Date(),
          },
        ],
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      set({ isLoading: false })
    }
  },

  removeGuardian: (id) => set((state) => ({
    guardians: state.guardians.filter((g) => g.id !== id),
  })),

  updateGuardianStatus: (id, status) => set((state) => ({
    guardians: state.guardians.map((g) =>
      g.id === id 
        ? { ...g, status, lastActive: new Date() }
        : g
    ),
  })),

  canAddMoreGuardians: () => {
    const activeGuardians = get().guardians.filter(
      (g) => g.status !== 'revoked'
    )
    return activeGuardians.length < 3
  },
}))