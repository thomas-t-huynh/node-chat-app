let expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it ('should generate correct message object', () => {
        let from = 'name';
        let text = 'some words';
        let generatedMessage = generateMessage(from , text);
        expect(generatedMessage).toInclude({ from, text })
        expect(generatedMessage.createdAt).toBeA('number');
    });
});