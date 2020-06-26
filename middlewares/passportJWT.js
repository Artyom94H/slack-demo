const { Users } = require('../models');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcryptjs');
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (app) => {
  const UserService = new (require('../services/user'))(app);

  // Realization with cookie token
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
  };

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, (email, password, done) => {

      return Users.findOne({where: {'email': email}})
        .then(user => {

          if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Incorrect email or password.'});
          }

          if (user && bcrypt.compareSync(password, user.password)) {
            return done(null, user, {
              message: 'Logged In Successfully'
            });
          }
        })
        .catch(err => {
          return done(err);
        });
    }
  ));

  passport.use(new JWTStrategy({
      // jwtFromRequest: cookieExtractor,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: getEnv('jwt_secret'),
    }, async (jwtPayload, done) => {
      const user = await UserService.getById(jwtPayload.id);

      if (!user) {
        return done(null, false);
      }

      done(null, user);
    }
  ))

}
