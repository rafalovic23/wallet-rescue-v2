// app/api/guardians/add/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { bot } from '@/server/discord/bot'

export async function POST(req: Request) {
  try {
    const { discordId, walletAddress } = await req.json()

    // Vérifier si le wallet existe
    const wallet = await prisma.wallet.findUnique({
      where: { address: walletAddress }
    })

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 404 }
      )
    }

    // Créer la demande de guardian
    const guardian = await prisma.guardian.create({
      data: {
        discordId,
        walletId: wallet.id,
        status: 'PENDING'
      }
    })

    // Créer un ticket Discord pour le guardian
    try {
      const guild = await bot.guilds.fetch(process.env.DISCORD_GUILD_ID!)
      const channel = await guild.channels.create({
        name: `guardian-request-${discordId}`,
        type: 4, // GUILD_TEXT
        permissionOverwrites: [
          {
            id: guild.id,
            deny: ['ViewChannel'],
          },
          {
            id: discordId,
            allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'],
          }
        ]
      })

      await channel.send({
        content: `<@${discordId}>, you have been requested to be a guardian for wallet ${walletAddress}.\n\nUse \`/accept-guardian\` or \`/decline-guardian\` to respond.`,
      })
    } catch (error) {
      console.error('Failed to create Discord ticket:', error)
      // On continue même si la création du ticket échoue
    }

    return NextResponse.json({ success: true, guardian })
  } catch (error) {
    console.error('Failed to add guardian:', error)
    return NextResponse.json(
      { error: 'Failed to add guardian' },
      { status: 500 }
    )
  }
}