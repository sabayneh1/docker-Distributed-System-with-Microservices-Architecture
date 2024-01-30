// app.js (Sample code for a microservice)

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, this is the product service!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Product service listening at http://<your-ec2-public-ip>:${port}`);
});
