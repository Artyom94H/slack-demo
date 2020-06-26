const dotenv = require('dotenv');
dotenv.config();
const bootstrap = require('./bootstrap');
bootstrap();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/config');
const SequelizeObj = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const passport = require('passport');
const env = process.env.NODE_ENV || 'development';

const app = express();

require(`./middlewares/passportJWT`)(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front_app/build')));

app.set('env', env);
app.set('config', config[env]);
app.set('SDB', SequelizeObj);
app.set('Router', express.Router);

app.use('/api/auth', require('./routes/auth')(app));
app.use('/api/users', require('./routes/users')(app));
app.use('/api/workspaces', passport.authenticate('jwt', {session: false}), require('./routes/workspaces')(app));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front_app/build', 'index.html'));
})

app.use(errorHandler);

//default no route response
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});



module.exports = app;
