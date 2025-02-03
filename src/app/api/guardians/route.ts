import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const wallet = searchParams.get('wallet')

  if (!wallet) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    )
  }

  try {
    const guardians = await prisma.guardian.findMany({
      where: {
        wallet: {
          address: wallet
        }
      },
      orderBy: {
        createdAt: 'desc'  // Changé de dateAdded à createdAt
      }
    })

    return NextResponse.json({ guardians })
  } catch (error) {
    console.error('Failed to fetch guardians:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guardians' },
      { status: 500 }
    )
  }
}