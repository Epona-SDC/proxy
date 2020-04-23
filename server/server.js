require('newrelic');

const express = require('express');
const cors = require('cors');
// const morgan = require("morgan");
const request = require('request');
const port = 3000;

// const servicePath = 'http://localhost:3003';
const bookingsPath1 = 'http://52.15.41.113:3003';
const bookingsPath2 = 'http://52.15.92.56:3003';
const bookingsAPI = `/api/rentals`;

const paths = [bookingsPath1, bookingsPath2];
let path = 0;

let app = express();

// app.use(morgan('dev'));

const toggle = function() {
  if (path === 0) {
    path = 1;
  } else {
    path = 0;
  }
}

app.use(express.static(__dirname + '/../public'));

app.get(`/api/rentals`, (req, res) => {
  const id = parseInt(req.query.id);
  toggle();
  const query = `${paths[path]}${bookingsAPI}?id=${id}`
  req.pipe(request(query)).pipe(res);
});

app.post(`/api/rentals`, (req, res) => {
  // console.log('POST request received, trying to pass to service');
  req.pipe(request(bookingsAPI)).pipe(res);
});
