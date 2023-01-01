const mysql = require('mysql');
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mis'
});
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req,res)=>{
    con.query("select * from mis_user",(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});
app.post('/',(req,res)=>{
    const data = req.body;
    con.query("INSERT INTO mis_user SET ?",data,(err,result)=>{
    if(err){
        throw err;
    }else{
        res.send(result);
    }
});
});

app.put('/:USER_ID', (req,res)=>{
    const data = [req.body.USER_NAME,req.body.USER_EMAIL,req.body.USER_PASSWORD,req.params.USER_ID];
    con.query("UPDATE mis_user SET USER_NAME = ?, USER_EMAIL = ?, USER_PASSWORD = ? where USER_ID = ?",data,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
});

app.delete('/:USER_ID', (req,res)=>{
    let user_id = req.params.USER_ID;
    con.query("DELETE from mis_user where USER_ID = "+user_id,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
})
app.listen(4300);