const { Client, Intents} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS]})
const { token } =  require('./config.json')

client.once('ready', () => {
	console.log('Ready!')
})

client.login(token)