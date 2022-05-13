const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Entry.init({
    title: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Entry',
  });
  return Entry;
};
