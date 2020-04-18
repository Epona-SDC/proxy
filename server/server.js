require('newrelic');

const express = require('express');
const cors = require('cors');
// const morgan = require("morgan");
const request = require('request');
const port = 3000;

// const servicePath = 'http://localhost:3003';
const bookingsPath = 'http://52.15.41.113:3003';
const bookingsAPI = `${bookingsPath}/api/rentals`;

let app = express();

// app.use(morgan('dev'));

app.use(express.static(__dirname + '/../public'));

app.get(`/api/rentals`, (req, res) => {
  const id = parseInt(req.query.id);
  const query = `${bookingsAPI}?id=${id}`
  req.pipe(request(query)).pipe(res);
});

app.post(`/api/rentals`, (req, res) => {
  // console.log('POST request received, trying to pass to service');
  req.pipe(request(bookingsAPI)).pipe(res);
});
