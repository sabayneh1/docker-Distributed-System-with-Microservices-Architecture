const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Auth Service: User authentication and authorization.');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Product service listening at http://<your-ec2-public-ip>:${port}`);
});

