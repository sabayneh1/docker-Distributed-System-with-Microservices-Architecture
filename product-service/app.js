const express = require('express');
const app = express();
const port = 3003;

app.get('/', (req, res) => {
  res.send('Product Service: Product catalog and information.');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Product service listening at http://<your-ec2-public-ip>:${port}`);
});

