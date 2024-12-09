const { findTextInFile, transformFileToJson, writeLine, deleteLine} = require('../file');


const usersFileTest = "users-test.txt";


test('Find text in File', () => {
    const foundText = findTextInFile(usersFileTest, "9324892384");
    expect(foundText).toEqual(1);
});
 
test.skip('Find text in File, Not found', () => {
    const foundText = findTextInFile(usersFileTest, "83492734235");
    expect(foundText).toEqual(0);
});

test.skip('Find text in File, Not found', () => {
    const fileTojson = transformFileToJson(usersFileTest);
    console.log(fileTojson);
});

test('Write text in a File', () => {
    let Id = "4444";
    let username = "fulano";
    let response = writeLine(usersFileTest,`- ${Id}: ${username}`);
    expect(response).toEqual(true);
})

test('Find text in File and Delete it', () => {
    let foundText = findTextInFile(usersFileTest, "4444");
    let successResult = deleteLine(usersFileTest, foundText);
    expect(successResult).toEqual(true);
    let foundText2 = findTextInFile(usersFileTest, "4444");
    expect(foundText2).toEqual(0);
});

