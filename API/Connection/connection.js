const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ap_db',
    port: '3306'
});

mysqlConnection.connect( err =>{
    if(err){
        console.log('Error In DB: ', err);
        return;
    }
    else{
        console.log('DB Working')
    }
});

module.exports = mysqlConnection;