import { prisma } from '@/lib/prisma'

// Définir l'enum directement ici
enum GuardianStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED'
}

export async function addGuardian(walletId: string, discordId: string, username: string) {
  return prisma.guardian.create({
    data: {
      walletId,
      discordId,
      username,
      status: GuardianStatus.PENDING
    },
  })
}