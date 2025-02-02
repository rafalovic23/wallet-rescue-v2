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


if (!process.env.DISCORD_BOT_TOKEN) {
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

  client.user.setActivity('Protecting Wallets', { 
    type: ActivityType.Watching 
  })

  registerCommands().then(() => {
    console.log('✅ Commands registered successfully')
  }).catch((error) => {
    console.error('❌ Failed to register commands:', error)
  })
})

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

export async function startBot() {
  try {
    console.clear()
    console.log('\n🤖 Initializing bot...')
    
    if (!process.env.DISCORD_BOT_TOKEN) {
      throw new Error('Missing DISCORD_BOT_TOKEN in environment variables')
    }

    await bot.login(process.env.DISCORD_BOT_TOKEN)
    console.log('✅ Bot successfully logged in!')
  } catch (error) {
    console.error('❌ Failed to start bot:', error)
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  console.log('📴 Shutting down bot...')
  bot.destroy()
  process.exit(0)
})

// Start the bot
startBot()