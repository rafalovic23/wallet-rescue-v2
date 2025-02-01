// src/server/discord/handlers/guardian.ts
import { ChatInputCommandInteraction } from 'discord.js'
import { prisma } from '@/lib/prisma'

type RequestAction = 'accept' | 'decline'

export async function handleGuardianRequest(
  interaction: ChatInputCommandInteraction,
  action: RequestAction
) {
  const wallet = interaction.options.getString('wallet', true)
  const guardianId = interaction.user.id

  try {
    const request = await prisma.guardianRequest.findFirst({
      where: {
        walletAddress: wallet,
        guardianDiscordId: guardianId,
        status: 'PENDING'
      }
    })

    if (!request) {
      await interaction.reply({
        content: 'No pending guardian request found for this wallet.',
        ephemeral: true
      })
      return
    }

    await prisma.guardianRequest.update({
      where: { id: request.id },
      data: {
        status: action === 'accept' ? 'ACCEPTED' : 'DECLINED'
      }
    })

    await interaction.reply({
      content: `Successfully ${action}ed guardian request for wallet ${wallet}.`,
      ephemeral: true
    })
  } catch (error) {
    console.error('Error handling guardian request:', error)
    await interaction.reply({
      content: 'An error occurred while processing the request.',
      ephemeral: true
    })
  }
}