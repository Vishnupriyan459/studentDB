const mysql=require('mysql');
const pool =mysql.createConnection({
    connectionLimit:10,
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root',
    database:'studentDB'
})
pool.connect(function(err){
    if (err) throw err;
    console.log('database connected')
    
});



module.exports=pool;