require('newrelic');

const express = require('express');
const cors = require('cors');
const request = require('request');
const port = 3000;

// const servicePath = 'http://localhost:3003';
const servicePath = 'http://52.15.41.113';


let app = express();

// app.use(express.json());
app.use(express.static(__dirname + '/../public'));


app.post(`/api/rentals`, (req, res) => {
  // console.log('POST request received, trying to pass to service');
  const passAlongUrl = `${servicePath}/api/rentals`;
  req.pipe(request(passAlongUrl)).pipe(res);
});


app.listen(port, err => {
  console.log(`Listening on port ${port}...`);
});
