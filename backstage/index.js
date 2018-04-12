const express=require("express")
const app=express()
const dataB=require("./indexModule/dataB.js")
// const callBack=require("./indexModule/callBack.js")
// const getUserList=require("./indexModule/changeParams.js")

dataB.connect();

app.use(express.static("../frontEnd"))

app.get("/userlist",function(req,res){
    dataB.query('SELECT * FROM `userlist`', function (err, data) {
        if(err){
            console.log(err)
            res.end()
        }else{
            res.json(data)
            res.end()
        }
    })
})

app.get("/del",function(req,res){
	let id=req.query.id
    dataB.query(`DELETE FROM userlist WHERE userlist.id = ${id}`, function (err, data) {
        if(err){
        	console.log(err);
			res.end()
        }else{
        	res.write("OK")
			res.end()
        }
	})
})

app.get("/change",function(req,res){
	let name=req.query.name
	let age=req.query.age
	let sex=req.query.sex
	let id=req.query.id
	let modSql = 'UPDATE userlist SET name = ?,age = ?,sex = ? WHERE Id = ?'
	let modSqlParams = [name,age,sex,id];
	dataB.query(modSql,modSqlParams, function (err, data) {
        if(err){
        	console.log(err);
			res.end()
        }else{
        	res.write("OK")
			res.end()
        }
	})
})

app.get("/add",function(req,res){
	let name=req.query.name
	let age=req.query.age
	let sex=req.query.sex
	let  addSql = 'INSERT INTO userlist(name,age,sex) VALUES(?,?,?)';
	let  addSqlParams = [name,age,sex];
	dataB.query(addSql,addSqlParams, function (err, data) {
        if(err){
        	console.log(err);
			res.end()
        }else{
        	res.write("OK")
			res.end()
        }
	})
})

app.listen(3001)
console.log("OK")