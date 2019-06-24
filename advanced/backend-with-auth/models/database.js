const Sequelize = require('sequelize');
const sequelize = new Sequelize('graphql', 'root', '', {
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  logging: false
});

module.exports = {
  sequelize
};