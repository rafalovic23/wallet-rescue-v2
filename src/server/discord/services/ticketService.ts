// src/server/discord/services/ticketService.ts
import { 
    Client, 
    TextChannel, 
    ChannelType, 
    ButtonBuilder, 
    ActionRowBuilder,
    ButtonStyle,
    PermissionFlagsBits
  } from 'discord.js'
  
  export class TicketService {
    constructor(private client: Client) {}
  
    async createGuardianTicket(guildId: string, guardianId: string, walletAddress: string) {
      try {
        const guild = await this.client.guilds.fetch(guildId)
        
        // Créer catégorie si elle n'existe pas
        let category = guild.channels.cache.find(
          c => c.type === ChannelType.GuildCategory && c.name === 'GUARDIAN-REQUESTS'
        )
        
        if (!category) {
          category = await guild.channels.create({
            name: 'GUARDIAN-REQUESTS',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
              {
                id: guild.id,
                deny: [PermissionFlagsBits.ViewChannel],
              }
            ]
          })
        }
  
        // Créer le ticket
        const channel = await guild.channels.create({
          name: `guardian-${guardianId.slice(0, 6)}`,
          type: ChannelType.GuildText,
          parent: category.id,
          permissionOverwrites: [
            {
              id: guild.id,
              deny: [PermissionFlagsBits.ViewChannel],
            },
            {
              id: guardianId,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ReadMessageHistory
              ],
            }
          ]
        })
  
        // Envoyer le message avec les boutons
        await channel.send({
          content: `🔐 Hello <@${guardianId}>,\n\nYou have been requested to be a guardian for wallet \`${walletAddress}\`.\n\nAs a guardian, you will be responsible for helping the wallet owner recover access if needed. Please review the request and respond using the buttons below.`,
          components: [
            new ActionRowBuilder<ButtonBuilder>()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId(`accept_guardian_${walletAddress}`)
                  .setLabel('Accept Request')
                  .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                  .setCustomId(`decline_guardian_${walletAddress}`)
                  .setLabel('Decline Request')
                  .setStyle(ButtonStyle.Danger)
              )
          ]
        })
  
        return channel
      } catch (error) {
        console.error('Failed to create guardian ticket:', error)
        throw error
      }
    }
  }