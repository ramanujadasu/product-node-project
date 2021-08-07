const dbConfig = require("../config/db.config.js");
var mysql = require('mysql');

var con = mysql.createConnection({
  host: dbConfig.mysqlUrl,
  user: dbConfig.mysqlUsername,
  password: dbConfig.mysqlPassword
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE productdb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});