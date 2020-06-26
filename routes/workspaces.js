module.exports = app => {
  const settings = app.locals.settings;
  const Router   = settings.Router();
  const WorkspacesController = require('../controllers/workspaces')(app);
  const validationScheme = require('../validations/workspaces');
  const validate = require('../middlewares/joiValidator');

  Router.get('/', WorkspacesController.all);
  Router.get('/get-availability', WorkspacesController.getAvailableWorkspaces);
  Router.get('/:id', WorkspacesController.show);
  Router.post('/', validate(validationScheme.create),WorkspacesController.create);
  Router.put('/:id', validate(validationScheme.put), WorkspacesController.put);
  Router.delete('/:id', WorkspacesController.destroy);

  return Router;
};
