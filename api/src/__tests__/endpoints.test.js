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


describe('GET the test endpoint', () => {
    test('/test should respond with statuscode 200', async (next) => {
        try {
            const response = await request.get('/test');
            expect(response.status).toBe(200);
            next();
        } catch (e) {}
    });
});

describe('create placeholder data', () => {
    test('POST request /createPlaceholderData cannot be empty', async (next) => {
        try {
            const response = await request.post('/createPlaceholderData');
            expect(response.status).toBe(400);
            next();
        } catch (e) {
            // console.log(e);
        }
    });

    test('POST request /createPlaceholderData cannot send only data', async (next) => {
        try {
            const response = await request.post('/createPlaceholderData/test1234');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('POST request /createPlaceholderData cannot send only a type', async (next) => {
        try {
            const response = await request.post('/createPlaceholderData/2');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('POST request /createPlaceholderData has to have data and a type', async (next) => {
        try {
            const response = await request.post('/createPlaceholderData/2/test1234');
            expect(response.status).toBe(200);
            next();
        } catch (e) {}
    });


    test('POST request /createPlaceholderData: the parameter -type- has to be either 0, 1 or 2', async (next) => {
        try {
            const response = await request.post('/createPlaceholderData/2/hello');
            expect(response.status).toBe(200);
            next();
        } catch (e) {}
    });

    test('POST request /createPlaceholderData: the parameter -type- cannot be something that isnt 0, 1 or 2', async (next) => {
        try {
            const response = await request.post('/createPlaceholderData/5/hello');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });
});

describe('GET: /getPlaceholderData endpoint', () => {
    test('/getData cannot be called without parameters', async (next) => {
        try {
            const response = await request.get('/getPlaceholderData');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('/getPlaceholderData cannot be called with a type parameter that doesnt exist (=/= 0, 1 or 2)', async (next) => {
        try {
            const response = await request.get('/getPlaceholderData/5');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('/getPlaceholderData called with a type parameter returns a random piece of data from that type', async (next) => {
        try {
            const response = await request.get('/getPlaceholderData/0');
            expect(response.body).toBeDefined();
            next();
        } catch (e) {}
    });
});

describe('DELETE endpoint', () => {
    test('/deletePlaceholderData cannot be called without uuid', async (next) => {
        try {
            const response = await request.get('/deletePlaceholderData');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });
});

describe('UPDATE endpoint', () => {
    test('/updatePlaceholderData cannot be called without parameters', async (next) => {
        try {
            const response = await request.get('/updatePlaceholderData');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('/updatePlaceholderData cannot be called with only 1 parameter', async (next) => {
        try {
            const response = await request.get('/updatePlaceholderData/0');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

    test('/updatePlaceholderData cannot be called with only 2 parameters', async (next) => {
        try {
            const response = await request.get('/updatePlaceholderData/0/1');
            expect(response.status).toBe(400);
            next();
        } catch (e) {}
    });

});

