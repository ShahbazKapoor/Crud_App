const mysql = require('mysql');

const connectDB = mysql.createConnection({
    host: 'bryasxyvusuqimtapky8-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'uubwjacmgltjdy9a',
    password: 'wjKGKMxO8uxZCx3NAJna',
    database: 'bryasxyvusuqimtapky8',
    connectTimeout: 20000, // Increased connection timeout to 20 seconds
});

module.exports = connectDB;
