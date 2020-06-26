'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workspaces = sequelize.define('Workspaces', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    subDomain: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {});
  Workspaces.associate = function(models) {
    // associations can be defined here
    Workspaces.belongsTo(models.Users, { foreignKey: 'id' })
  };
  return Workspaces;
};
