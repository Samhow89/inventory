const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  // database configuration
});

const YourModel = sequelize.define('YourModel', {
  columnName1: Sequelize.DataType,
  columnName2: Sequelize.DataType,
  // Add more columns as needed
});

// Sync the model with the database
YourModel.sync();
