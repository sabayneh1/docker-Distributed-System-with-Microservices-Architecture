const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('User Service: User authentication and authorization.');
});

// Conditionally listen on the port if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, '0.0.0.0', () => {
    console.log(`User service listening on port ${port}`);
  });
}

// Export the Express application
module.exports = app;
