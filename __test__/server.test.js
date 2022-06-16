'use strict';

//process.env.SECRET = "TEST_SECRET";

const { sequelize } = require('../src/auth/models/index');
const supertest = require('supertest');
const { server } = require('../src/server');

const mockRequest = supertest(server);

let userAccount = { 'username': 'Trent', 'password': '66' };

let accessToken = null;

beforeAll(async () => {
  await sequelize.sync();
});

describe('Authentication Router', () => {
    test('Add a new user',async ()=>{
        const response = await mockRequest.post('/signup').send(userAccount);
        let obj = response.body;

        expect(response.status).toEqual(201);
        expect(obj.username).toEqual(userAccount.username);
    });

    it('Invalid token', async () => {
        const response = await mockRequest.get('/secretstuff')
        .set('Authorization', `bearer not found`);
    
        expect(response.status).toBe(500);
      });
    });


afterAll(async () => {
    await sequelize.drop();
});