const mysql = require('mysql');

const connection = mysql.createConnection({
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  host: process.env.RDS_HOSTNAME,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT,
  multipleStatements: true,
});




module.exports = connection;

