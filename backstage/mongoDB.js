const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
var ObjectID = require('mongodb').ObjectID;

const express=require("express")
const app=express()

app.use(express.static("../frontEndMondoDB"))


app.get("/student",(req,res)=>{
    // res.send("helloword")
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("school");
        dbo.collection("student").find().toArray(function(err, data) { // 返回集合中所有数据
            if (err) throw err;
            res.send(data)
            db.close();
        });
    });
})

app.get("/addMongoDB",(req,res)=>{
    let name=req.query.name
    let age=req.query.age
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("school");
        var myobj = { "name": name, "age": age };
        dbo.collection("student").insertOne(myobj, function(err, data) {
            if (err) throw err;
            db.close();
            res.send(data)
        });
    });
})

app.get("/del",(req,res)=>{
    let id=req.query.id
    console.log(id)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("school");
        var whereStr = { "_id" : ObjectID(id)};  // 查询条件
        dbo.collection("student").deleteOne(whereStr, function(err, data) {
            if (err) throw err;
            console.log("文档删除成功");
            db.close();
            res.send(data)
        });
    });
})

app.get("/change",(req,res)=>{
    let id=req.query.id
    let name=req.query.name
    let age=req.query.age
    console.log(id)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("school");
        var whereStr = { "_id" : ObjectID(id)};
        var updateStr = {$set:{"name":name,"age":age}};
        dbo.collection("student").updateOne(whereStr, updateStr, function(err, data) {
            if (err) throw err;
            console.log("文档更新成功");
            res.send(data)
            db.close();
        });
    });
})




app.listen(3004)
console.log("OK")