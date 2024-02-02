const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, this is the product service!');
});

if (process.env.NODE_ENV !== 'test') {
  // Listen on all network interfaces
  app.listen(port, '0.0.0.0', () => {
    console.log(`Product service listening on port ${port}`);
  });
}


// Export the Express application
module.exports = app;
