const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',      // Do not include the port number here
    user: 'root',
    password: 'KALANA',
    database: 'schedulemate',
    port: 3306              // Specify the port number here, if needed
  });
  connection.connect();

module.exports = connection;