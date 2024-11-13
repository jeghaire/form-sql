const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
});

connection.connect(err => {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Connected to database');
  }
});

module.exports = connection;

// https://medium.com/@msaqibshah001/a-simple-form-app-with-nodejs-and-mysql-e0d47a042db1