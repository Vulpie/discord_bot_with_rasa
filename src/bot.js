require('dotenv').config()

const { Client } = require('discord.js')
const fetch = require('node-fetch')
const { parseMessage } = require('./parseMessage/parseMessage')

const discord_token = process.env.DISCORDJS_BOT_TOKEN
const rasa_endpoint = process.env.RASA_ENDPOINT

const client = new Client()
const prefix = '$'

client.on('ready', () => {
	// console.log(`Hello. I'm ${client.user.username}`)
	// console.log(`Hello. I'm ${client.user.tag}`)
	console.log('The ancient evil survives!')
})

client.on('message', (message) => {
	if (message.author.bot) return

	if (message.content.startsWith(prefix)) {
		const user_input = message.content.substring(1)

		const rasa_input = {
			sender: 'Rasa',
			message: user_input,
		}

		fetch(rasa_endpoint + '/webhooks/rest/webhook', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(rasa_input),
		})
			.then((res) => res.json())
			.then(async (data) => {
				const response_list = await parseMessage(data)
				await response_list.forEach((phrase, index) => {
					if (index === 0) message.reply(phrase)
					else message.channel.send(phrase)
				})
			})
	}
})

client.login(discord_token)
