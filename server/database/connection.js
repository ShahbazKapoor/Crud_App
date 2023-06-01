const mysql = require('mysql');

const connectDB = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'mycrud',
    user: 'root',
    password: 'root123',
    multipleStatements: true
});

module.exports = connectDB;
