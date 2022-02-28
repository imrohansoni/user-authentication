const express = require('express');
const path = require('path');
const ejs = require('ejs');

const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/user', (err) => {
  console.log('database is connected 😊');
});

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

app.listen(3000, function () {
  console.log('server is running 😀');
});
