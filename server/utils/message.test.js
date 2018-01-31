let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it ('should generate correct message object', () => {
        let from = 'name';
        let text = 'some words';
        let generatedMessage = generateMessage(from , text);
        expect(generatedMessage).toInclude({ from, text })
        expect(generatedMessage.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it ('should generate correct location oject', () => {
        let from = 'name';
        let latitude = 1;
        let longitude = 1;
        let url = 'https://www.google.com/maps?q=1,1';
        let generatedMessage = generateLocationMessage(from , latitude , longitude);
        expect(generatedMessage).toInclude({
            from,
            url
        });
        expect(generatedMessage.createdAt).toBeA('number');
    });
});