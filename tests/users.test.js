const { findTextInFile, transformFileToJson} = require('../file');

test.skip('Find text in File', () => {
    const foundText = findTextInFile("users-test.txt", "9324892384");
    expect(foundText).toEqual(1);
});

test('Find text in File, Not found', () => {
    const foundText = findTextInFile("users-test.txt", "83492734235");
    expect(foundText).toEqual(0);
});

test.skip('Find text in File, Not found', () => {
    const fileTojson = transformFileToJson("users-test.txt");
    console.log(fileTojson);
});