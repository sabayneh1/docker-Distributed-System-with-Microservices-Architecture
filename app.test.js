const request = require('supertest');
const app = require('./app'); // Import your Express app

describe('GET /', () => {
  it('responds with a greeting', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, this is the product service!');
  });
});
