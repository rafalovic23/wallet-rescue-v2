// src/app/api/wallet/setup/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    const wallet = await prisma.wallet.create({
      data: {
        address: body.address,
        encryptedPrivateKey: body.privateKey || '', // Ajout d'une valeur par défaut
      }
    })

    return NextResponse.json(wallet)

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to setup wallet' }, 
      { status: 500 }
    )
  }
}