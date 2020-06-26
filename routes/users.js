module.exports = app => {
  const settings = app.locals.settings;
  const Router   = settings.Router();
  const UserController = require('../controllers/user')(app);

  Router.get('/', UserController.all);
  Router.get('/:id', UserController.show);
  Router.put('/', UserController.put);

  return Router;
};
