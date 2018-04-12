module.exports=function (err, data) {
        if(err){
            console.log(err)
            res.end()
        }else{
            res.json(data)
            res.end()
        }
    }