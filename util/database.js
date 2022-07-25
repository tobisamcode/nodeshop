// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node",
//   password: "Nelson2000@@@"
// });

// module.exports = pool.promise();

const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("node", "root", "Nelson2000@@@", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
