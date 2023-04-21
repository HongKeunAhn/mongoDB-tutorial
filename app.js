const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.get('/', (request, response) => {
  response.send('Hello');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5500;

const Book = require('./models/book');
const router = require('./routes')(app, Book);

const server = app.listen(port, () => {
  console.log('Express server has started on port ' + port);
});

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongoose server');
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');
