const express = require('express');
const path = require('path');
const ejs = require('ejs');

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
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  res.end('<h1>your has been created</h1>');

  const User = new UserModel(req.body);

  User.save(function (err, user) {
    console.log(user);
  });
});

app.listen(3000, function () {
  console.log('server is running 😀');
});
