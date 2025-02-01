// src/server/discord/bot.ts
import { Client, GatewayIntentBits, Events } from 'discord.js'
import { registerCommands } from './commands'
import { handleGuardianRequest } from './handlers/guardian'

const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN

if (!DISCORD_TOKEN) {
  throw new Error('Missing DISCORD_BOT_TOKEN environment variable')
}

export const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
})

bot.once(Events.ClientReady, () => {
  console.log('Discord bot is ready!')
  registerCommands()
})

// Gestionnaire des commandes slash
bot.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  try {
    switch (interaction.commandName) {
      case 'accept-guardian':
        await handleGuardianRequest(interaction, 'accept')
        break
      case 'decline-guardian':
        await handleGuardianRequest(interaction, 'decline')
        break
      // Plus de commandes à venir
    }
  } catch (error) {
    console.error('Error handling command:', error)
    await interaction.reply({
      content: 'An error occurred while processing your request.',
      ephemeral: true
    })
  }
})