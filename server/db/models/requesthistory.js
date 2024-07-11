'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RequestHistory extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  RequestHistory.init({
    userId: DataTypes.INTEGER,
    goodRequest: DataTypes.STRING,
    badRequest: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RequestHistory',
  });
  return RequestHistory;
};