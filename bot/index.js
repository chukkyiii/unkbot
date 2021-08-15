/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// require the discord.js module
const Discord = require('discord.js');
const { NONAME } = require('dns');
// create a new Discord client
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
let exec = require('child_process').exec, child;
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
	if(message.content.startsWith(prefix) || !message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().slipt(/ +/);
	const command = args.shift().toLowerCase()

	if(command = 'unk'){
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
		fs.writeFile(`query.json`, md_text, function(err) {
			if(err)
				return console.log(err);
			console.log("The file was saved!");
		});

		// making shell commands to run python file 
		child = exec('cd ..; cd unk_seq2seq; python3 infer.py',
			function (error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log('exec error: ' + error);
					message.channel.send('sorry it may take a moment...')
				}
			});
		
		const { promisify } = require('util');
		const readFile = promisify(fs.readFile);

		// handles the answer ready to send to discord. 

		setTimeout(async() =>  {
		try {
			const result = await readFile(`/mnt/d/dev/unkbot/bot/query.json`, 'utf8');
			console.log(result);
			let value = JSON.parse(result)
			answer = value["answer"]
			message.channel.send(answer);
		} catch(e) {
			console.error(e);
			message.channel.send("sorry, I didn't hear you could you say that again.")
		}}, 20000);
	}
	
});
