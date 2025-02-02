import { ChatInputCommandInteraction } from 'discord.js'
import { prisma } from '@/lib/prisma'
import { GuardianStatus } from '@prisma/client'

type RequestAction = 'approve' | 'reject'

export async function handleRecoveryRequest(
  interaction: ChatInputCommandInteraction,
  action: RequestAction
) {
  console.log(`🔄 Processing recovery ${action} request`)
  
  const wallet = interaction.options.getString('wallet', true)
  const discordId = interaction.user.id
  const username = interaction.user.tag

  try {
    // Vérifier le statut de guardian
    const guardian = await prisma.guardian.findFirst({
      where: {
        discordId,
        wallet: {
          address: wallet
        },
        status: GuardianStatus.ACTIVE
      }
    })

    if (!guardian) {
      await interaction.reply({
        content: '❌ You are not an active guardian for this wallet.',
        ephemeral: true
      })
      return
    }

    // Vérifier la demande de recovery
    const recoveryRequest = await prisma.recoveryRequest.findFirst({
      where: {
        wallet: {
          address: wallet
        },
        status: 'PENDING'
      },
      include: {
        votes: true,
        wallet: {
          include: {
            guardians: {
              where: {
                status: GuardianStatus.ACTIVE
              }
            }
          }
        }
      }
    })

    if (!recoveryRequest) {
      await interaction.reply({
        content: '❌ No pending recovery request found for this wallet.',
        ephemeral: true
      })
      return
    }

    // Vérifier si le guardian a déjà voté
    const existingVote = recoveryRequest.votes.find(vote => 
      vote.guardianId === guardian.id
    )

    if (existingVote) {
      await interaction.reply({
        content: `❌ You have already ${existingVote.approved ? 'approved' : 'rejected'} this recovery request.`,
        ephemeral: true
      })
      return
    }

    // Enregistrer le vote
    await prisma.recoveryVote.create({
      data: {
        guardianId: guardian.id,
        recoveryRequestId: recoveryRequest.id,
        approved: action === 'approve'
      }
    })

    // Calculer si le seuil est atteint
    const totalGuardians = recoveryRequest.wallet.guardians.length
    const requiredVotes = Math.ceil(totalGuardians * 0.66) // 66% des guardians doivent approuver
    const approvedVotes = recoveryRequest.votes.filter(vote => vote.approved).length + (action === 'approve' ? 1 : 0)

    let responseMessage = `✅ Successfully ${action}ed the recovery request\n`
    responseMessage += `Current status: ${approvedVotes}/${requiredVotes} required votes`

    // Si le seuil est atteint, approuver la recovery
    if (approvedVotes >= requiredVotes) {
      await prisma.recoveryRequest.update({
        where: { id: recoveryRequest.id },
        data: { status: 'APPROVED' }
      })
      responseMessage += '\n🎉 Recovery request has been approved!'
    }

    await interaction.reply({
      content: responseMessage,
      ephemeral: true
    })

    console.log(`✅ Recovery ${action} recorded for wallet ${wallet} by guardian ${username}`)

  } catch (error) {
    console.error('❌ Error handling recovery request:', error)
    await interaction.reply({
      content: '❌ An error occurred while processing your request.',
      ephemeral: true
    })
  }
}