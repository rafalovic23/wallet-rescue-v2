// app/api/wallet/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { walletAddress, privateKey } = await req.json()

    const wallet = await prisma.wallet.create({
      data: {
        address: walletAddress,
        encryptedPrivateKey: privateKey, // À remplacer par chiffrement avec Lit Protocol
      }
    })

    return NextResponse.json({ success: true, wallet })
  } catch (error) {
    console.error('Wallet registration failed:', error)
    return NextResponse.json({ error: 'Failed to register wallet' }, { status: 500 })
  }
}