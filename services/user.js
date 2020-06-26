const { Users, Workspaces } = require('../models');

class UserService {
  getAll = async () => {
    try {
      return await Users.findAll();
    } catch (e) {
      console.error('Users get all error: ', e.stack || e);
      throw({ msg: e.stack, status: 500 });
    }
  }

  getById = id => {
    return Users.findOne({
      where: { id },
      include: {
        model: Workspaces,
        as: 'workspaces',
      },
    });
  };

  update = (id, params) => {
    return Users.update(params, {
      where: { id },
    });
  };
}

module.exports = UserService;
