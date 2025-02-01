import { ChatInputCommandInteraction } from 'discord.js'
import { prisma } from '@/lib/prisma'
import { GuardianStatus } from '@prisma/client'

type RequestAction = 'accept' | 'decline'

export async function handleGuardianRequest(
  interaction: ChatInputCommandInteraction,
  action: RequestAction
) {
  console.log(`🔄 Processing guardian ${action} request`)
  
  const wallet = interaction.options.getString('wallet', true)
  const discordId = interaction.user.id
  const username = interaction.user.tag

  try {
    // Vérifier si la demande existe déjà
    const existingGuardian = await prisma.guardian.findFirst({
      where: {
        discordId,
        wallet: {
          address: wallet
        }
      }
    })

    if (existingGuardian) {
      if (existingGuardian.status !== GuardianStatus.PENDING) {
        await interaction.reply({
          content: `❌ You are already a ${existingGuardian.status.toLowerCase()} guardian for this wallet.`,
          ephemeral: true
        })
        return
      }
    }

    // Trouver le wallet
    const walletRecord = await prisma.wallet.findUnique({
      where: { address: wallet },
      include: { guardians: true }
    })

    if (!walletRecord) {
      await interaction.reply({
        content: '❌ Wallet not found.',
        ephemeral: true
      })
      return
    }

    // Vérifier le nombre de guardians
    if (action === 'accept' && walletRecord.guardians.filter(g => g.status === GuardianStatus.ACTIVE).length >= 3) {
      await interaction.reply({
        content: '❌ This wallet already has the maximum number of guardians (3).',
        ephemeral: true
      })
      return
    }

    // Mettre à jour ou créer le guardian
    if (existingGuardian) {
      await prisma.guardian.update({
        where: { id: existingGuardian.id },
        data: { 
          status: action === 'accept' ? GuardianStatus.ACTIVE : GuardianStatus.REVOKED 
        }
      })
    } else if (action === 'accept') {
      await prisma.guardian.create({
        data: {
          discordId,
          username,
          status: GuardianStatus.ACTIVE,
          wallet: { connect: { id: walletRecord.id } }
        }
      })
    }

    // Envoyer la réponse
    await interaction.reply({
      content: `✅ Successfully ${action}ed guardian request for wallet ${wallet}.`,
      ephemeral: true
    })

    // Log l'action
    console.log(`✅ Guardian request ${action}ed for wallet ${wallet} by user ${username}`)

  } catch (error) {
    console.error('❌ Error handling guardian request:', error)
    await interaction.reply({
      content: '❌ An error occurred while processing the request.',
      ephemeral: true
    })
  }
}