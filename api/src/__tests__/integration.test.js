const supertest = require('supertest');
const app = require('./../server.js');

const request = supertest(app);


describe('Running through the endpoints', () => {
    let uuid;
    test('creating new data', async (next) => {
        try {
            const response = await request.post('/create/2/test1234');
            expect(response.status).toBe(200);
            uuid = response.body.uuid;
            console.log(uuid);
            next();
        } catch (e) {}
    });

    test('updating the data', async (next) => {
        try {
            const response = await request.get('/update/' + uuid + '/0/newtest');
            expect(response.status).toBe(200);
            next();
        } catch (e) {}
    });

    test('deleting the data', async (next) => {
        try {
            const response = await request.get('/delete/' + uuid);
            expect(response.status).toBe(200);
            next();
        } catch (e) {}
    });
});