const express = require('express');
const path = require('path');
const ejs = require('ejs');
const md5 = require('md5');

const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

const user = {
  username: String,
  email: String,
  number: Number,
  password: String,
};

const connection_url = 'mongodb://localhost:27017/user';

mongoose.connect(connection_url, (err) => {
  console.log('database is connected 😊');
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    min: [8, 'username must be between 8 to 16 letters'],
    max: [16, 'username must be between 8 to 16 letters'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  number: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    required: [true, 'enter password'],
  },
});

const UserModel = mongoose.model('users', userSchema);

app.get('/', (req, res) => {
  res.render('template.ejs', { page: 'home', title: 'home' });
});

app.get('/login', (req, res) => {
  res.render('template.ejs', {
    page: 'login',
    title: 'login',
    error: 'no error',
  });
});

app.get('/signup', (req, res) => {
  res.render('template.ejs', { page: 'signup', title: 'signup' });
});

app.post('/signup', (req, res) => {
  const User = new UserModel({
    username: req.body.username,
    email: req.body.email,
    number: req.body.number,
    password: md5(req.body.password),
  });
  User.save(function (err, user) {
    res.redirect('/login');
  });
});

app.post('/login', (req, res) => {
  UserModel.findOne(
    { username: req.body.username, password: md5(req.body.password) },
    (err, user) => {
      if (err) {
        console.log('SOMETHING WENT WRONG ⛔');
        return res.redirect('/login');
      }

      if (user) {
        console.log('USER FOUND 🔥🔥');
        return res.redirect('/');
      }

      console.log('USER NOT FOUND 😑😑');
      res.redirect('/login');
    }
  );

  // res.redirect('/');
});

app.listen(3000, function () {
  console.log('server is running 😀');
});
