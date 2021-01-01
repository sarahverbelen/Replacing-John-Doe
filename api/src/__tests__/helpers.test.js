let Helpers = require('../utils/helpers.js');

describe('testing the checkDataLength function', () => {
    test('data has to be a string', () => {
        expect(Helpers.checkDataLength(5)).toBe(false);
    });

    test('data has to be longer than one', () => {
        expect(Helpers.checkDataLength("h")).toBe(false);
    });

    test('data has to be shorter than 25', () => {
        expect(Helpers.checkDataLength("012345678901234567890123456789")).toBe(false);
    });

    test('data between 2 and 24 length that is a string is good', () => {
        expect(Helpers.checkDataLength('hallo')).toBe(true);
    })
});