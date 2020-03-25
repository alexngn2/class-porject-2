var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 8080,
  user: "root",
  password: "Compt@n5",
  database: "stocks_db"
});
// Make connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
// Export connection
module.exports = connection;