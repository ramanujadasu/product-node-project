const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.mysqlHost,
  user: dbConfig.mysqlUsername,
  password: dbConfig.mysqlPassword,
  database: dbConfig.mysqlDB
});

module.exports = connection;