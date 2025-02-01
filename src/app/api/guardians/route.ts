// src/app/api/guardians/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { walletAddress, guardianDiscordId, username } = await req.json()
    
    const wallet = await prisma.wallet.findUnique({
      where: { address: walletAddress }
    })
    
    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 })
    }

    const guardian = await prisma.guardian.create({
      data: {
        walletId: wallet.id,
        discordId: guardianDiscordId,
        username
      }
    })

    return NextResponse.json(guardian)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add guardian' },
      { status: 500 }
    )
  }
}