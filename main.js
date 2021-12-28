require('dotenv').config();
const token = process.env.TOKEN;
const telegramBot = require("./localModules/telegramBot/telegramBot");

//creation of bot
const tlBot = telegramBot.createBot(token,"/");

tlBot.addCommand("/command1", function(message){
    //do something in reaction to the message

    //maybe send a message in response
    tlBot.sendMessage(message.chat.id, text);
})

tlBot.addCommand("/command2", function(message){
    //do something in reaction to the message
})


exports.processMessage = dootBot.processMessage
