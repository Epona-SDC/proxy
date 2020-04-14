const express = require('express');
const cors = require('cors');
const request = require('request');
const port = 3000;

let app = express();

// app.use(express.json());
app.use(express.static(__dirname + '/../public'));


app.post("/api/rentals", (req, res) => {
  // console.log('POST request received, trying to pass to service');
  const passAlongUrl = 'http://localhost:3003/api/rentals';
  req.pipe(request(passAlongUrl)).pipe(res);
});


app.listen(port, err => {
  console.log(`Listening on port ${port}...`);
});
