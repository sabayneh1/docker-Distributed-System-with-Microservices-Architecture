const express = require('express');
const app = express();
const port = 3003;

app.get('/', (req, res) => {
  res.send('Product Service: Product catalog and information.');
});

// Add a health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

if (process.env.NODE_ENV !== 'test') {
  // Listen on all network interfaces
  app.listen(port, '0.0.0.0', () => {
    console.log(`Product service listening on port ${port}`);
  });
}


// Export the Express application
module.exports = app;
