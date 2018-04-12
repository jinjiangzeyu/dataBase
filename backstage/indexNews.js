const express=require("express")
const app=express()
const mysql=require('mysql');
let dataB = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'news'
})
dataB.connect();

app.use(express.static('../frontEndNews'))

app.get("/newslist",(req,res)=>{
    dataB.query('SELECT * FROM `newslist`', function (err, data) {
        if(err){
            console.log(err)
            res.end()
        }else{
            res.json(data)
            res.end()
        }
    })
})


app.listen(3002)