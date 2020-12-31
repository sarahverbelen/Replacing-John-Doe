const supertest = require('supertest');
const app = require('./../server.js');

const request = supertest(app);

describe('create placeholder data', () => {
    test('POST request /create cannot be empty', async (next) => {
        try {
            const response = await request.post('/create');
            expect(response.status).toBe(400);
            next();
        } catch (e) {
            // console.log(e);
        }
    });

    test('POST request /create cannot send only data', async (next) => {
        try {
            const response = await request.post('/create/test1234');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('POST request /create cannot send only a type', async (next) => {
        try {
            const response = await request.post('/create/2');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('POST request /create has to have data and a type', async (next) => {
        try {
            const response = await request.post('/create/2/test1234');
            expect(response.status).toBe(200);
            next();
        } catch (e) {}
    });


    test('POST request /create: the parameter -type- has to be either 0, 1 or 2', async (next) => {
        try {
            const response = await request.post('/create/2/hello');
            expect(response.status).toBe(200);
            next();
        } catch (e) {}
    });

    test('POST request /create: the parameter -type- cannot be something that isnt 0, 1 or 2', async (next) => {
        try {
            const response = await request.post('/create/5/hello');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });
});