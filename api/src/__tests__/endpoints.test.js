const supertest = require('supertest');
const app = require('./../server.js');

const request = supertest(app);


describe('GET the test endpoint', () => {
    test('/test should respond with statuscode 200', async (next) => {
        try {
            setTimeout(async function () {
                const response = await request.get('/test');
                expect(response.status).toBe(200);
                next();
            }, 1000);
        } catch (e) {}
    });
});

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

describe('GET: /getData endpoint', () => {
    test('/getData cannot be called without parameters', async (next) => {
        try {
            const response = await request.get('/getData');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('/getData cannot be called with a type parameter that doesnt exist (=/= 0, 1 or 2)', async (next) => {
        try {
            const response = await request.get('/getData/5');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('/getData called with a type parameter returns a random piece of data from that type', async (next) => {
        try {
            const response = await request.get('/getData/0');
            expect(response.body).toBeDefined();
            next();
        } catch (e) {}
    });
});

describe('DELETE endpoint', () => {
    test('/delete cannot be called without uuid', async (next) => {
        try {
            const response = await request.get('/delete');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });
});