// src/lib/db/types.ts
import { Prisma } from '@prisma/client'

export type WalletWithGuardians = Prisma.WalletGetPayload<{
  include: {
    guardians: true
  }
}>

export type RecoveryWithVotes = Prisma.RecoveryRequestGetPayload<{
  include: {
    votes: true
    wallet: true
  }
}>