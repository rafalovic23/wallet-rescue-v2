// src/lib/discord.ts
const DISCORD_API_ENDPOINT = 'https://discord.com/api/v10'

export interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string | null
}

export const fetchDiscordUser = async (userId: string, accessToken: string): Promise<DiscordUser> => {
  const response = await fetch(`${DISCORD_API_ENDPOINT}/users/${userId}`, {
    headers: {
      Authorization: `Bot ${process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch Discord user')
  }

  return response.json()
}