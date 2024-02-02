// user-service/app.test.js
const request = require('supertest');
const app = require('./app');

let server;

beforeAll((done) => {
  server = app.listen(0, done); // Use dynamic port allocation
});

afterAll((done) => {
  server.close(done);
});

describe('GET /', () => {
  test('responds with a greeting', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, this is the product service!'); // Update expected text
  });
});
