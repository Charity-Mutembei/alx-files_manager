const { expect } = require('chai');
const request = require('supertest');
const app = require('../app'); // Replace with your Express app instance

describe('Endpoint Tests', () => {
  it('GET /status should return status 200', async () => {
    const res = await request(app).get('/status');
    expect(res.status).to.equal(200);
  });

  it('GET /stats should return status 200', async () => {
    const res = await request(app).get('/stats');
    expect(res.status).to.equal(200);
  });

  it('POST /users should create a new user and return status 201', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'testpass' };
    const res = await request(app).post('/users').send(userData);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('userId');
  });

  it('GET /files should return status 200 with pagination', async () => {
    const res = await request(app).get('/files?page=1&limit=10');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('files');
    expect(res.body.files).to.be.an('array');
  });

});
