const { UserModel } = require('../models/userModel');
const md5 = require('md5');

module.exports = {
  homeRender: (req, res) => {
    res.render('template.ejs', { page: 'home', title: 'home' });
  },
  loginRender: (req, res) => {
    res.render('template.ejs', {
      page: 'login',
      title: 'login',
      error: 'no error',
    });
  },
  signupRender: (req, res) => {
    res.render('template.ejs', { page: 'signup', title: 'signup' });
  },
  signupPost: (req, res) => {
    const User = new UserModel({
      username: req.body.username,
      email: req.body.email,
      number: req.body.number,
      password: md5(req.body.password),
    });
    User.save(function (err, user) {
      res.redirect('/login');
    });
  },

  loginPost: (req, res) => {
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
  },
};
