const qrcode = require("qrcode-terminal");

const {flatTextForSearch, extractUser, searchUser} = require("./controller");

const { Client, LocalAuth } = require('whatsapp-web.js');
const groupIds = ['120363158104323219@g.us'];

const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    var userFoundAt = 0;
    var users = {};
    // Check if the message is from a group
    //console.log(`from: ${message.from}`)
    if (groupIds.includes(message.from)) { // Group IDs start with 'g'

        console.log(`Group message received: ${message.body}`);
        console.log(`Author: ${message.author}`);
        //onst senderInfo = await client.getContact(senderId); // Get contact info

        if (flatTextForSearch(message.body) === 'si' ) {
            //users = loadUsers();
            userFoundAt = searchUser(extractUser(message.author, true));
            if (userFoundAt == 0){
                client.sendMessage(message.from, 'Registrate por ejemplo: \nfutbot registrame @mafer');
            }else {
                client.sendMessage(message.from, ` anotada`);
            }

        }

        if (flatTextForSearch(message.body).startsWith('futbot registrame')) {
            // send back "pong" to the chat the message was sent in
            username = extractUser(message.body);
            userFoundAt = searchUser(message.author);
            if (userFoundAt > 0 ){
                //Update User
                //replaceUser(userFoundAt, `- ${message.author}: ${username}`);
            }else{
                //Create User
                //write(usersFile,`- ${message.author}: ${username}`);
            }
            client.sendMessage(message.from, 'registrada');
        }

        if (message.body.startsWith('futbot chingas a tu madre')) {
            // send back "pong" to the chat the message was sent in
            client.sendMessage(message.from, 'chinga la tuya');
        }
    }else{
        console.log(`from ${message.from}: ${message.body}`)
    }
});

// client initialization...

client.initialize();

