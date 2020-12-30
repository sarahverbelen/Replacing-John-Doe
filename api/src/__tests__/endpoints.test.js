const supertest = require('supertest');
const app = require('./../server.js');

const request = supertest(app);

describe('GET the test endpoint', () => {
    test('/test should respond with statuscode 200', async (next) => {
        try {
            const response = await request.get('/test');
            expect(response.status).toBe(200, next());
        } catch (e) {}
    });
});

describe('create placeholder data', () => {
    test('POST request /create cannot be empty', async (next) => {
        try {
            const response = await request.post('/create');
            expect(response.status).toBe(400, next());
        } catch (e) {}
    });

    test('POST request /create has to have data and a type', async (next) => {
        try {
            // only data
            const response1 = await request.post('/create').send({'data': 'test1234'});
            expect(response1.status).toBe(400, next());

            // only type
            const response2 = await request.post('/create').send({'type': 2});
            expect(response2.status).toBe(400, next());

            // both type and data
            const response3 = await request.post('/create').send({'data': 'test1234', 'type': 2});
            expect(response3.status).toBe(200, next());
        } catch (e) {}
    });

    test('POST request /create: the parameter -data- has to be of type string', async (next) => {
        try {
            // number
            const response1 = await request.post('/create').send({'data': 123, 'type': 2});
            expect(response1.status).toBe(400, next());

            // string
            const response2 = await request.post('/create').send({'data': 'hello', 'type': 2});
            expect(response2.status).toBe(200, next());
        } catch (e) {}
    });

    test('POST request /create: the parameter -type- has to be of type number and has to be either 0, 1 or 2', async (next) => {
        try {
            // string
            const response1 = await request.post('/create').send({'data': 'hello', 'type': '2'});
            expect(response1.status).toBe(400, next());

            // not 0, 1 or 2
            const response2 = await request.post('/create').send({'data': 'hello', 'type': 5});
            expect(response2.status).toBe(400, next());

            // number and 0, 1 or 2
            const response3 = await request.post('/create').send({'data': 'hello', 'type': 2});
            expect(response3.status).toBe(200, next());
        } catch (e) {}
    });
});