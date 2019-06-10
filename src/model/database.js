const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'firstworkspace'
});

mysqlConnection.connect((err) => {
    if (err) {
        throw (err);
    }
});

module.exports = mysqlConnection;
