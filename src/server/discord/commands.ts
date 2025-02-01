import { REST, Routes, SlashCommandBuilder } from 'discord.js'

const commands = [
  // Guardian commands
  new SlashCommandBuilder()
    .setName('accept-guardian')
    .setDescription('Accept becoming a guardian for a wallet')
    .addStringOption(option => 
      option
        .setName('wallet')
        .setDescription('The wallet address you will be guardian for')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('decline-guardian')
    .setDescription('Decline becoming a guardian for a wallet')
    .addStringOption(option => 
      option
        .setName('wallet')
        .setDescription('The wallet address you are declining to be guardian for')
        .setRequired(true)
    ),
  
  // Recovery commands
  new SlashCommandBuilder()
    .setName('approve-recovery')
    .setDescription('Approve a wallet recovery request')
    .addStringOption(option =>
      option
        .setName('wallet')
        .setDescription('The wallet address requesting recovery')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('reject-recovery')
    .setDescription('Reject a wallet recovery request')
    .addStringOption(option =>
      option
        .setName('wallet')
        .setDescription('The wallet address requesting recovery')
        .setRequired(true)
    ),
]

export async function registerCommands() {
  try {
    console.log('🔄 Starting to register commands...')
    
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!)

    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      { body: commands }
    )

    console.log('✅ Successfully registered all commands')
  } catch (error) {
    console.error('❌ Error registering commands:', error)
    throw error
  }
}