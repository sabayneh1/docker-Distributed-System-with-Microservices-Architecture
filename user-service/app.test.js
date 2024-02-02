const request = require('supertest');
const express = require('express');
const app = require('./app'); // Adjust the path as necessary

let server;

beforeAll(() => {
  server = app.listen(3002); // Start your server
});

afterAll((done) => {
  server.close(done); // Close the server after tests
});

describe('GET /', () => {
  test('responds with a greeting', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, this is the product service!');
  });
});
