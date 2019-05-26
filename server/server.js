const express = require("express");
// const fs = require("fs");
const fs = require('fs');
var mysql = require('mysql');
// const http = require("http");
var cors = require('cors')
const baseUrl = "http://www.landonrepp.com/index.html";
const app = express();
const port = 80;
// initialize storedProcedureList
let storedProcedureList = [];

const credentials = {
    host: 'localhost',
    user: 'landonrepp',
    password: 'password',
    database: 'gw2'
}



app.use(cors());
function handleErr(err){
    console.log(err);
    var pool = mysql.createPool(credentials);
}

var pool = mysql.createPool(credentials);
refreshDBLink();


function refreshDBLink(){
    callSp('getStoredProcedureList',false).then(result=>{
        let li = [];
        console.log(result[0]);
        for(i in result[0]){
            li.push(result[0][i].name);
        }
        storedProcedureList = li;
    });
}
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
function callSp(sp,checkIfExists = true){
    return new Promise((resolve,reject)=>{
        console.log(sp);
        if(storedProcedureList.indexOf(sp)==-1 && checkIfExists){
            reject("no stored procedure of that name");
            console.log("no stored procedure of that name");
        }
        else{
            pool.getConnection((err,con)=>{
                console.log(`CALL ${sp}()`);
                con.query(`CALL ${sp}()`,(err,result,fields)=>{
                    if(err) {
                        handleErr();
                        reject(err);
                    }
                    else{
                        resolve(result);
                    }
                });
                con.release();
            });
        }
    });
}

app.get('/',(req,res)=>{
    // navigation redirect
    res.end(`<html><body><script>window.location.replace('${baseUrl}')</script><body></html>`)
});

app.get('/hotItems',(req,res)=>{
    getHotItems().then(result=>{
        res.end(JSON.stringify(result[0].map(re=>{
            return re["itemsID"];
        })));
    });
});
app.get('/calc/:itemNumber',(req,res)=>{
    console.log(req.url);
    console.log(req.params['itemNumber']);
    getMarketData(req.params['itemNumber']).then((values)=>{
        res.end(JSON.stringify(values[0]));
    });
});


app.get('/:path?id=:id',(req,res)=>{
    console.log(req.url);

    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});

app.get('/:path',(req,res)=>{
    console.log(req.url);

    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});
app.get('/sql/sp/:sp',(req,res)=>{
    let sp=req.sq;
    console.log(storedProcedureList);
    callSp(sp).then(result=>{
        res.end(result);
    });
});


app.listen(port,()=>{
    console.log('listening to port '+port);
});