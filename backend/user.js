module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
    surname: type.STRING,
    email: { 
        type: type.STRING,
        allowNull: false },
    password: type.STRING,
    role : type.STRING,
  });
};
