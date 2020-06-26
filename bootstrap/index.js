const environmentKeys = {
  'jwt_secret': process.env.JWT_SECRET,
}

const env = (key, byDefault = '') => {
  return environmentKeys[key] || byDefault;
}

module.exports = () => {
  global.getEnv = env;
}
