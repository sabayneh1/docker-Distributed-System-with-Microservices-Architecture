const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('User Service: User management and profiles.');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Product service listening at http://<your-ec2-public-ip>:${port}`);
});
