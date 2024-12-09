const { findTextInFile, transformFileToJson, write} = require("./file");

const usersFile = "users.txt";
const partidoFile = "partido.txt"


function searchUser(userId){
    return findTextInFile("users.txt", userId);
}

function loadUsers(){
    transformFileToJson(usersFile, (err, jsonArray) => {
    if (err) {
        console.error(err);
    } else {
        console.log(JSON.stringify(jsonArray, null, 4));
        return jsonArray;
    }
    });
}


function replaceUser(newUser, pos){
    replaceLineInFile(usersFile, pos, newUser, (err, message) => {
        if (err) {
            console.error(err);
        } else {
            console.log(message);
        }
    });
}


function extractUser(text, isAtAtAfter){
    var match;
    // Regular expression to match the username after @
    if (isAtAtAfter)
        match = text.match(/(\w+)@/);
    else
        match = text.match(/@(\w+)/);

    if (match) {
        let username = match[1]; // The username is in the first capturing group
        console.log(`Extracted username: ${username}`);
        return username;
    } else {
        console.log('No username found.');
        return ""
    }
}

function flatTextForSearch(text){
    return text.toLowerCase();
}

function addUser(Id, username){
    write(usersFile,`- ${Id}: ${username}`);

} 

module.exports = {
    flatTextForSearch,
    extractUser,
    searchUser
};