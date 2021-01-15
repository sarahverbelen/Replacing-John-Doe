const supertest = require('supertest');
const app = require('./../server.js');

const request = supertest(app);


describe('Running through the endpoints', () => {
    let uuid;
    test('creating new data', async (next) => {
        try {
            const response = await request.post('/createPlaceholderData/2/test1234');
            expect(response.status).toBe(200);
            uuid = response.body.uuid;
            console.log(uuid);
            next();
        } catch (e) {}
    });

    test('updating the data', async (next) => {
        try {
            const response = await request.get('/updatePlaceholderData/' + uuid + '/0/newtest');
            expect(response.status).toBe(200);
            next();
        } catch (e) {}
    });

    test('deleting the data', async (next) => {
        try {
            const response = await request.get('/deletePlaceholderData/' + uuid);
            expect(response.status).toBe(200);
            next();
        } catch (e) {}
    });

    test('see if the data still exists..', async (next) => {
        try {
            const response = await request.get('/getAllPlaceholderData');
            let dataDeleted = true;
            for(data in response.body.res) {
                if(data.uuid == uuid) {
                    dataDeleted = false;
                }
            }
            expect(dataDeleted).toBe(false);
            next();
        } catch (e) {}
    });
    
});