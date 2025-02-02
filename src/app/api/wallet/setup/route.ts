// src/app/api/wallet/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { LitProtocolService } from '@/lib/lit-protocol'
import { ticketService } from '@/server/discord/services/ticketService'

// Dans votre handler POST :
for (const guardianId of guardians) {
  await ticketService.createGuardianTicket(
    process.env.DISCORD_GUILD_ID!,
    guardianId,
    walletAddress
  )
}

export async function POST(req: Request) {
  try {
    const { address, privateKey, guardians } = await req.json()
    
    const litService = new LitProtocolService()
    const { encryptedPrivateKey, encryptedSymmetricKey } = 
      await litService.encryptPrivateKey(privateKey, address, guardians)

    const wallet = await prisma.wallet.create({
      data: {
        address,
        encryptedPrivateKey,
        encryptedSymmetricKey,
        guardians: {
          create: guardians.map((discordId: string) => ({
            discordId,
            status: 'PENDING'
          }))
        }
      }
    })

    // Notifier les guardians via Discord
    for (const guardianId of guardians) {
      await notifyGuardian(
        discordClient,
        process.env.DISCORD_GUILD_ID!,
        guardianId,
        address
      )
    }

    return NextResponse.json(wallet)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to setup wallet recovery' },
      { status: 500 }
    )
  }
}