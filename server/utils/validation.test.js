const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let nonStringValue = 69;
        let res = isRealString(nonStringValue);
        expect(res).toBe(false);
    })

    it('should reject string with only spaces', () => {
        let spaceValues = '    ';
        let res = isRealString(spaceValues);
        expect(res).toBe(false);
    })

    it('should allow string with non-space characters', () => {
        let nonSpaceChars = 'The red room';
        let res = isRealString(nonSpaceChars);
        expect(res).toBe(true);
    })
})