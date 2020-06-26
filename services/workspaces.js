const { Workspaces: Model } = require('../models');

class Workspaces {
  _generateSubDomainName = async (name, userName) => {
    const variants = [];
    try {
      for (let i = 0; i < 4; i++) {
        const variant = `${ name }-${ i }${ userName ? `-${ userName }` : '' }`
        const variantData = await Model.findOne({ where: { subDomain: variant } });
        if (!variantData) {
          variants.push({
            title: variant
          });
        } else {
          variants.push({
            title: `${ name }-${ i + Math.floor(Math.random() * 10) }${ userName ? `-${ userName }` : '' }`
          });
        }
      }
    } catch (e) {
      console.log('generateSubDomainName error: ', e.stack || e);
    }
    return variants;
  };

  getAll = async () => {
    try {
      return await Model.findAll();
    } catch (e) {
      console.error('Workspaces get all error: ', e.stack || e);
      throw({ msg: e.msg, status: e.status || 500 });
    }
  }

  getAvailableWorkspaces = async  (params, user) => {
    try {
      const workspace = await Model.findOne({
        where: {
          subDomain: params.subDomain,
        }
      });
      if (!!workspace) {
        return {
          msg: 'Workspace all ready taken, you can use one of this variants',
          variants: await this._generateSubDomainName(params.subDomain, user.fullName),
        }
      }
      return {
        msg: '',
        variants: null,
      }
    } catch (e) {
      console.error('Workspaces get all error: ', e.stack || e);
      throw({ msg: e.msg, status: e.status || 500 });
    }
  }

  getById = async id => {
    try {
      return await Model.findOne({ where: { id } });
    } catch (e) {
      console.error('workspaces show error: ', e.stack || e);
      throw({ msg: e.msg || 'Something went wrong', status: e.status });
    }
  };

  create = async data => {
    try {
      if (await Model.findOne({ where: { subDomain: data.subDomain } })) {
        throw({ msg: `Subdomain ${ data.subDomain } has been taken`, status: 400 });
      }
      return await Model.create(data);
    } catch (e) {
      console.error('Workspaces post error: ', e.stack || e);
      throw({ msg: e.msg || 'Something went wrong', status: e.status });
    }
  }

  update = async (id, params) => {
    try {
      if (params.subDomain && await Model.findOne({ where: { subDomain: params.subDomain } })) {
        throw({ msg: `Subdomain ${ params.subDomain } has been taken`, status: 400 });
      }

      return Model.update(params, {
        where: { id },
        returning: true,
      });
    } catch (e) {
      console.error('Workspaces put error: ', e.stack || e);
      throw({ msg: e.msg || 'Something went wrong', status: e.status || 500 });
    }
  };

  destroy = async id => {
    try {
      return await Model.destroy({
        where: { id },
      });
    } catch (e) {
      console.error('Workspaces delete error: ', e.stack || e);
      throw({ msg: e.msg || 'Something went wrong', status: 500 });    }
  };
}

module.exports = Workspaces;
