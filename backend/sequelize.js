const { Sequelize } = require('sequelize');
const UserModel = require('./user');

// const sequelizeSqlite = new Sequelize('db.sqlite', 'admin', 'password', {
//     host: 'sqlite',
//     dialect: 'sqlite'
//   });

const sequelize = new Sequelize('sqlite::memory:');

async function auth() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }  
}

auth();

const UserSqlite = UserModel(sequelize, Sequelize);

// sequelizeSqlite.sync()
//   .then(() =>{});

module.exports = UserSqlite;