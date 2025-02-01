// src/lib/db/wallet.ts
import { prisma } from '../prisma'

export async function createWallet(address: string, userId: string) {
  return prisma.wallet.create({
    data: {
      address,
      userId,
    },
  })
}

export async function getWalletWithGuardians(address: string) {
  return prisma.wallet.findUnique({
    where: { address },
    include: {
      guardians: true,
    },
  })
}