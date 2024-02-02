const express = require('express');
const publicIp = require('public-ip'); // Import the public-ip package
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Auth Service: User authentication and authorization.');
});

// Dynamically fetch the public IP address and start the server
if (process.env.NODE_ENV !== 'test') {
  publicIp.v4().then(ip => {
    app.listen(port, ip, () => {
      console.log(`Auth service listening at http://${ip}:${port}`);
    });
  }).catch(err => {
    console.error('Error fetching public IP address:', err);
  });
}
