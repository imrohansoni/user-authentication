const userControllers = require('./../controllers/userController');

const userRoutes = function (app) {
  app.get('/', userControllers.homeRender);

  app.get('/login', userControllers.loginRender);

  app.get('/signup', userControllers.signupRender);

  app.post('/signup', userControllers.signupPost);

  app.post('/login', userControllers.loginPost);
};

module.exports = {
  userRoutes: userRoutes,
};
