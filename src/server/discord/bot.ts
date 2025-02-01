// src/server/discord/bot.ts
import { 
  Client, 
  GatewayIntentBits, 
  Events, 
  ActivityType 
} from 'discord.js'
import { registerCommands } from './commands'
import { handleGuardianRequest } from './handlers/guardian'
import { handleRecoveryRequest } from './handlers/recovery'

const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN

if (!DISCORD_TOKEN) {
  throw new Error('Missing DISCORD_BOT_TOKEN environment variable')
}

export const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
})

bot.once(Events.ClientReady, (client) => {
  console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`)
  console.log(`🌐 Connected to ${client.guilds.cache.size} servers`)

  // Set bot activity
  client.user.setActivity('Protecting Wallets', { 
    type: ActivityType.Watching 
  })

  // Register slash commands
  registerCommands().then(() => {
    console.log('✅ Commands registered successfully')
  }).catch((error) => {
    console.error('❌ Failed to register commands:', error)
  })
})

// Command handler
bot.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  console.log(`🔄 Received command: ${interaction.commandName}`)

  try {
    switch (interaction.commandName) {
      case 'accept-guardian':
        await handleGuardianRequest(interaction, 'accept')
        break
      case 'decline-guardian':
        await handleGuardianRequest(interaction, 'decline')
        break
      case 'approve-recovery':
        await handleRecoveryRequest(interaction, 'approve')
        break
      case 'reject-recovery':
        await handleRecoveryRequest(interaction, 'reject')
        break
      default:
        await interaction.reply({ 
          content: '❌ Unknown command', 
          ephemeral: true 
        })
    }
  } catch (error) {
    console.error('❌ Error handling command:', error)
    await interaction.reply({
      content: '❌ An error occurred while processing your request. Please try again later.',
      ephemeral: true
    })
  }
})

// Error handlers
bot.on('error', (error) => {
  console.error('❌ Bot error:', error)
})

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled promise rejection:', error)
})

// Start the bot
export function startBot() {
  console.log('🚀 Starting bot...')
  bot.login(DISCORD_TOKEN).then(() => {
    console.log('🔑 Bot logged in successfully')
  }).catch((error) => {
    console.error('❌ Failed to log in:', error)
  })
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('📴 Shutting down bot...')
  bot.destroy()
  process.exit(0)
})