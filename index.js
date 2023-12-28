const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
//   res.send('Hello, World!');
  res.status(200).json({ message: 'Server successfully started', port });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
