const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('user Service: User authentication and authorization.');
});

if (process.env.NODE_ENV !== 'test') {
  // Listen on all network interfaces
  app.listen(port, '0.0.0.0', () => {
    console.log(`user service listening on port ${port}`);
  });
}
