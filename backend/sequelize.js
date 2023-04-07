const Sequelize = require('sequelize');
const UserModel = require('./user');

const sequelizeSqlite = new Sequelize('dbname', 'admin', 'password', {
    host: 'sqlite',
    dialect: 'sqlite'
  });

  const UserSqlite = UserModel(sequelizeSqlite, Sequelize);

  sequelizeSqlite.sync()
    .then(() =>{});

    module.exports = UserSqlite;