/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// require the discord.js module
const Discord = require('discord.js');
const { NONAME } = require('dns');
// create a new Discord client
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

const fs = require('graceful-fs')
let crypto = require('crypto')

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({
		status: 'online',
		activity: {
			type: 'WATCHING',
			name: 'The Unk is with you',
		},
	});
});

// login to Discord with your app's token
client.login(token);

client.on('message', message => {
	console.log(`${message.channel.name}: ${message.author.username} has sent: ${message.content}`);

	// So that it does not talk to itself
	if (message.author.bot == message.author.username) return; 

	const sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

	// Here is a object, linking answer and comment
	// Not really a question: change it to comment.  
	let dict = {
		'question': message.content,
		'answer': null
	}

	// Turn object to JSON and write that file to a JSON file. 
	let dicstring = JSON.stringify(dict)
	let md_text = dicstring


	// writes file to query.json
	fs.writeFile(`query.json`, md_text, function (err) {
		if (err)
			return console.log(err);
		console.log("The file was saved!");
	});
	
	const { exec } = require("child_process");

	exec("cd ..; cd unk_seq2seq; python3 infer.py", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log('running command')
		console.log(`stdout: ${stdout}`);
	});

	fs.readFile('/mnt/d/dev/unkbot/bot/query.json', 'utf-8', function (err, data){
		if (err)
			return console.log(err);
		
		console.log(`this is the result: ${data}`);
		let value = JSON.parse(data)
		answer = value["answer"]
		console.log('sending message...')
		message.channel.send(answer);
	})

});