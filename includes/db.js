const mysql = require('mysql');
const config = require('./config');

const db = mysql.createConnection(config.db_params);

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected.');
});

module.exports = db;
