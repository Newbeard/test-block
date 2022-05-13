const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate({
      User
    }) {
      this.belongsTo(User, {
        foreignKey: 'user_id'
      });
    }
  }
  Token.init({
    refresh_token: DataTypes.STRING(3000),
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};
