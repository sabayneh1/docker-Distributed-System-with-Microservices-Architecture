const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Auth Service: User authentication and authorization.');
});

// Add a health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

if (process.env.NODE_ENV !== 'test') {
  // Listen on all network interfaces
  app.listen(port, '0.0.0.0', () => {
    console.log(`Auth service listening on port ${port}`);
  });
}


// Export the Express application
module.exports = app;
