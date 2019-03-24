const express = require("express");
// const fs = require("fs");
const fs = require('fs');
var mysql = require('mysql');
// const http = require("http");
const app = express();
const port = 80;
const credentials = {
    host: 'localhost',
    user: 'landonrepp',
    password: 'Ilike0909',
    database: 'gw2'
}

function handleErr(err){
    console.log(err);
    var pool = mysql.createPool(credentials);
}

var pool = mysql.createPool(credentials);

function getMarketData(intID){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            con.query(`CALL getMarketHistory(${intID})`,(err,result,fields)=>{
                if(err) {
                    handleErr(err);
                    reject(err);
                }
                resolve(result)
            });
            con.release();
        });
    });
}
function getHotItems(){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            con.query(`CALL getHotItems()`,(err,result,fields)=>{
                if(err) {
                    handleErr();
                    reject(err);
                }
                else
                    resolve(result);
            });
            con.release();
        });
    });
}

app.get('/',(req,res)=>{
    // navigation redirect
    res.end("<html><body><script>window.location.replace('http://www.landonrepp.com/client/navigation.html')</script><body></html>")
});

app.get('/hotItems',(req,res)=>{
    getHotItems().then(result=>{
        res.end(JSON.stringify(result[0].map(re=>{
            return re["itemsID"];
        })));
    });
});

app.get('/client/:path?id=:id',(req,res)=>{
    console.log(req.url);

    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});

app.get('/client/:path',(req,res)=>{
    console.log(req.url);

    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});

app.get('/calc/:itemNumber',(req,res)=>{
    console.log(req.url);
    console.log(req.params['itemNumber']);
    getMarketData(req.params['itemNumber']).then((values)=>{
        res.end(JSON.stringify(values[0]));
    });
});


app.listen(port,()=>{
    console.log('listening to port '+port);
});