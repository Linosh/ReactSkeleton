/* eslint no-console: 0 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

const PORT = 4000;

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.use('/', (req, res) => {
  switch (req.url) {
    case '/' :
    case '/dummyPage' : {
      res.sendFile(path.join(__dirname, 'public', 'index-prod.html'));
      break;
    }

    case '/signon' : {
      // Redirect Ajax calls
      const url = `http://localhost:8081${req.url}`;
      request.post({ uri: url, json: req.body, headers: req.headers }).pipe(res);
      break;
    }

    default: {
      res.redirect('/');
    }
  }
});

server.listen(PORT, 'localhost', err => {
  if (err) console.log(`Error ${err}`);
  console.log(`Production server is running on port ${PORT}`);
});
