const Service = new (require('../services/user'))

module.exports = () => {
  const all = async (req, res) => {
    try {
      const result = await Service.getAll();
      return res.send(result);
    } catch (e) {
      res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  };

  const show = async (req, res) => {
    try {
      const userById = await Service.getById(req.params.id);
      return res.send(userById);
    } catch (e) {
      console.error('Users show error: ', e.stack || e);
      res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  };

  const put = async (req, res) => {
    try {
      const userNewData = Service.update(req.params.id, req.body);
      return res.send(userNewData);
    } catch (e) {
      console.error('Users put error: ', e.stack || e);
      return res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  };

  return {
    all,
    show,
    put,
  }
}
