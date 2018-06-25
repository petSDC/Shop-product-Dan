const mysql = require('mysql');
const pg = require('pg');

// const connection = mysql.createConnection({
//   user: 'dan',
//   password: 'ABCdef123!',
//   host: 'localhost',
//   database: 'shopProducts',
//   multipleStatements: true,
// });

const connection = new pg.Client('postgres://daniel:ABCdef123!@localhost:5432/danieldb');

module.exports = connection;

