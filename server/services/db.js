const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sql1712',
    database: 'collabsql'
});

const initDBConnection = () => {
    db.connect();
}

module.exports = {
    dbConnection: db, initDBConnection
};