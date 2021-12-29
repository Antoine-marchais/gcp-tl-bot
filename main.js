require('dotenv').config();
const token = process.env.TOKEN;
const telegramBot = require("./localModules/telegramBot/telegramBot");

//creation of bot
const tlBot = telegramBot.createBot(token);

tlBot.addCommand("command1", function(message){
    //do something in reaction to the message
    console.log('executing command 1')
    //maybe send a message in response
    tlBot.sendMessage(message.chat.id, 'example text');
})

tlBot.addCommand("command2", function(message){
    //do something in reaction to the message
    console.log('executing command 2')
})

tlBot.addExternalCommand("extcmd1", function(body){
    //do something with the request body
    console.log('executing external command 1', body)
})

exports.entryPoint = tlBot.entryPoint
