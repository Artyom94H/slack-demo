module.exports = app => {
  const Service = new (require('../services/workspaces'))(app);

  const all = async (req, res) => {
    try {
      const result = await Service.getAll(req.query);
      res.send(result);
    } catch (e) {
      res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  };

  const getAvailableWorkspaces = async (req, res) => {
    try {
      const result = await Service.getAvailableWorkspaces(req.query, req.user.toJSON());
      res.send(result);
    } catch (e) {
      res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  }

  const show = async (req, res) => {
    try {
      const workspace = await Service.getById(req.params.id);
      res.send(workspace);
    } catch (e) {
      res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  };

  const create = async (req, res) => {
    try {
      const workspace = await Service.create(req.body);
      res.send(workspace);
    } catch (e) {
      res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  };

  const put = async (req, res) => {
    try {
      const workspaceNewData = await Service.update(req.params.id, req.body);
      // TODO investigate issue: sequelize update not return updated data and not throwing error when send not existing workspace id
      res.send({ msg: 'Updated', workspace: workspaceNewData });
    } catch (e) {
      res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  };

  const destroy = async (req, res) => {
    try {
      await Service.destroy(req.params.id);
      return res.send({ msg: 'deleted' });
    } catch (e) {
      res.status(500).json({ msg: e.msg || 'Something went wrong' });
    }
  };

  return {
    all,
    getAvailableWorkspaces,
    show,
    create,
    put,
    destroy,
  }
}
