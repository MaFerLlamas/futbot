const { flatTextForSearch, extractUser } = require('../controller');

test.skip('Test flatTextForSearch that should convert a string to lower case', () => {
    let lowerCaseText = flatTextForSearch("Hola FUTBot RegisTrame");
    expect(lowerCaseText).toEqual("hola futbot registrame");
});


test.skip('Test Extract Text, we need for @Mafer to return Mafer', () => {
    let extractedName = extractUser("futbot registrame @Mafer", false);
    expect(extractedName).toEqual("Mafer");
});

test.skip('Test Extract Text, Behavior when @ is not coming in the user', () => {
    let extractedName = extractUser("futbot registrame Mafer", false);
    expect(extractedName).toEqual("");
});

test('Test Extract Text For whatsapp Users At is After, 5214671058661@c.us -> 5214671058661', () => {
    let extractedName = extractUser("5214671058661@c.us", true);
    expect(extractedName).toEqual("5214671058661");
});

test('Test Extract Text  At is After but is empty, @c.us -> ""', () => {
    let extractedName = extractUser("@c.us", true);
    expect(extractedName).toEqual("");
});