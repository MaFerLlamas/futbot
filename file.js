const fs = require('fs');
const readline = require('readline');

// Read a file asynchronously
function read(fileName){
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        console.log('File content:', data);
    });

}


// Write to a file asynchronously

function write(fileName,content){
    content = '- '+ content + '\n'
    fs.appendFile(fileName, content, err => {
        if (err) {
            console.error('Error writing to the file:', err);
            return;
        }
        console.log('File has been written successfully!');
    });
}

function findTextInFile(fileName, searchText) {
    const data = fs.readFileSync(fileName, 'utf-8'); // Read the file synchronously
    const lines = data.split('\n'); // Split the content into lines

    var foundLine = 0;
    lines.forEach((line, index) => {
        if (line.includes(searchText)) {
            foundLine = (index + 1); // Store the line number (1-based index)
        }
    });


    return foundLine; // Return the found line numbers

}



function replaceLineInFile(fileName, lineNumber, newText) {
    // Read the file content synchronously
    const data = fs.readFileSync(fileName, 'utf8');

    // Split the file content by line breaks to get an array of lines
    const lines = data.split(/\r?\n/);

    // Check if the line number is valid
    if (lineNumber < 1 || lineNumber > lines.length) {
        throw new Error('Invalid line number.');
    }

    // Replace the specific line with the new text
    lines[lineNumber - 1] = newText;

    // Join the lines back into a single string with line breaks
    const updatedContent = lines.join('\n');

    // Write the updated content back to the file synchronously
    fs.writeFileSync(fileName, updatedContent, 'utf8');

    return 'Line replaced successfully.';
}


function transformFileToJson(inputFile) {
    // Read the entire file content synchronously
    const data = fs.readFileSync(inputFile, 'utf8');

    const jsonArray = [];

    // Split the file content into lines
    const lines = data.split(/\r?\n/);
    
    // Process each line
    lines.forEach((line) => {
        // Match the pattern "- number: name"
        const match = line.match(/-\s*(\d+):\s*(.+)/);
        if (match) {
            const id = match[1];
            const name = match[2];
            jsonArray.push({ id: id, name: name });
        }
    });

    return jsonArray;
}

// replaceLineInFile(fileName, 2, 'This is the new text for line 3', (err, message) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(message);
//     }
// });

// Example usage
// findTextInFile(fileName, '34242', (err, lines) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(`Text found at line(s): ${lines.join(', ')}`);
//     }
// });


// transformFileToJson(fileName, (err, jsonArray) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(JSON.stringify(jsonArray, null, 4));
//     }
// });


module.exports = {
    findTextInFile,
    transformFileToJson,
    replaceLineInFile,
    write,
    read
};