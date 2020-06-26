const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { Users, Workspaces } = require('../models');

module.exports = () => {
  const signIn = async (req, res) => {
    try {
      const userData = await Users.findOne({ where: { email: req.body.email }, include: { model: Workspaces, as: 'workspaces' } });
      if (req.body.subDomain && !userData.workspaces.find(i => i.subDomain === req.body.subDomain)) {
        return res.status(401).json({
          msg: 'Please sign in your workspace',
        });
      }
    } catch (e) {
      return res.status(400).send({ msg: 'Something went wrong' })
    }
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed',
          user: user
        });
      }
      req.login(user, { session: false }, (err) => {

        if (err) {
          res.send(err);
        }

        const { password, ...userWithoutHash } = user.toJSON();
        const token = jwt.sign(user.toJSON(), getEnv('jwt_secret'));

        return res.json({
          ...userWithoutHash,
          token,
        });
      });
    })(req, res);
  }

  const signUp = async (req, res) => {
    try {
      const { email, password, fullName } = req.body;
      if (await Users.findOne({ where: { email: email } })) {
        return res.status(403).send({
          msg: `Email ${ email } isAlready taken`
        });
      }

      const userFields = {
        fullName,
        email,
        password: bcrypt.hashSync(password, 10),
      };

      await Users.create(userFields);
      return signIn(req, res);
    } catch (e) {
      console.error('Auth sign up error: ', e.stack || e);
      res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  };


  const getAuthUser = async (req, res) => {
    try {
      const user = req.user.toJSON();
      const userData = await Users.findOne({ where: { email: user.email }, include: { model: Workspaces, as: 'workspaces' } });
      if (req.query.subDomain && !userData.workspaces.find(i => i.toJSON().subDomain.toLowerCase() === req.query.subDomain.toLowerCase())) {
        return res.status(401).json({
          msg: 'Please sign in your workspace',
        });
      }
      const token = jwt.sign(user, getEnv('jwt_secret'));
      return res.json({
        ...user,
        token,
      });
    } catch (e) {
      console.error('Auth sign un error: ', e.stack || e);
      res.status(e.status || 500).send({ msg: e.msg || 'Something went wrong' });
    }
  }

  return {
    signUp,
    signIn,
    getAuthUser,
  };
};
