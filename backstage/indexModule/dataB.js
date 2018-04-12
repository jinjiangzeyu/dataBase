const mysql = require('mysql');
let dataB = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'userlist'
});
module.exports=dataB