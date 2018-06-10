const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  console.log(`[${JSON.stringify(new Date())}] ACCESS: ${req.method} ${req.path}`);
  next();
});

app.use(express.static(path.resolve(__dirname, 'build')));

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.listen(3000, err => {
  if (!err) {
    console.log('Server running');
  } else {
    console.error(err);
  }
});
