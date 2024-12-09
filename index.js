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

// RECIBIENDO MENSAJE
client.on('message', async message => {
    var userFoundAt = 0;
    var users = {};
    // Checamos si es de los grupos permitidos
    //console.log(`from: ${message.from}`)
    if (groupIds.includes(message.from)) { // Group IDs start with 'g'

        console.log(`Group message received: ${message.body}`);
        console.log(`Author: ${message.author}`);
        //onst senderInfo = await client.getContact(senderId); // Get contact info
        
        if (message.body.startsWith('futbot chingas a tu madre')) {
            client.sendMessage(message.from, 'chinga la tuya');
        } else if (flatTextForSearch(message.body).startsWith('futbot anotame')) {
            username = extractUser(message.body);
            userFoundAt = searchUser(message.author);
            if (userFoundAt > 0 ){
                //Actualizamos user
                //replaceUser(userFoundAt, `- ${message.author}: ${username}`);
            }else{
                write(usersFile,`- ${message.author}: ${username}`);
            }
            client.sendMessage(message.from, 'registrada');
        } else if (flatTextForSearch(message.body).startsWith('futbot') ) {
            //users = loadUsers();
            userFoundAt = searchUser(extractUser(message.author, true));
            if (userFoundAt == 0){
                client.sendMessage(message.from, 'Wey ni te topo');
                client.sendMessage(message.from, 'Registrate por ejemplo: \nfutbot anotame @mafer');
            }else {
                //client.sendMessage(message.from, ` anotada`);
                console.log(`reconozida:`);
            }
        }

    }else{
        console.log(`from ${message.from}: ${message.body}`)
    }
});

// client initialization...

client.initialize();

