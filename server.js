const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { userRoutes } = require('./routes/userRoute');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

const connection_url = `${process.env.CONNECTION_URI}/user`;

console.log(connection_url);

mongoose.connect(connection_url, (err) => {
  console.log('database is connected 😊');
});

userRoutes(app);

app.listen(3000, function () {
  console.log('server is running 😀');
});
