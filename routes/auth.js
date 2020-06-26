module.exports = app => {
  const settings = app.locals.settings;
  const Router   = settings.Router();
  const passport = require('passport');
  const Controller = require('../controllers/auth')();
  const validationScheme = require('../validations/auth');
  const validate = require('../middlewares/joiValidator');

  Router.post('/sign-in', validate(validationScheme.signIn), Controller.signIn);
  Router.post('/sign-up', validate(validationScheme.signUp), Controller.signUp);
  Router.get('/logout', (req, res) => {
    req.logout();

    res.cookie('jwt', {expires: Date.now()});
    res.send('logout')
  });
  Router.get('/me', passport.authenticate('jwt', {session: false}), Controller.getAuthUser);

  return Router;
};
