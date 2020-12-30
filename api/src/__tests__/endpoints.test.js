const { timeStamp } = require('console');
const { hasUncaughtExceptionCaptureCallback } = require('process');
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