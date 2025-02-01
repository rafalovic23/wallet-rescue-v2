// src/server/discord/commands.ts
import { REST, Routes, SlashCommandBuilder } from 'discord.js'

const commands = [
  new SlashCommandBuilder()
    .setName('accept-guardian')
    .setDescription('Accept a guardian request')
    .addStringOption(option =>
      option
        .setName('wallet')
        .setDescription('The wallet address requesting guardian status')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('decline-guardian')
    .setDescription('Decline a guardian request')
    .addStringOption(option =>
      option
        .setName('wallet')
        .setDescription('The wallet address requesting guardian status')
        .setRequired(true)
    ),
]

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!)

export async function registerCommands() {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
      { body: commands }
    )
    console.log('Successfully registered application commands.')
  } catch (error) {
    console.error('Error registering commands:', error)
  }
}