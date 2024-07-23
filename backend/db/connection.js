const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '765876',
    database: 'taskmanager'
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL connnected');
});

module.exports = db;

