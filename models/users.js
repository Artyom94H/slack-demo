'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fullName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {});

  Users.prototype.toJSON =  function () {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }

  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Workspaces, { foreignKey: 'userId', as: 'workspaces'});
  };
  return Users;
};
