const express = require("express");
// const fs = require("fs");
const fs = require('fs');
const MongoClient = require("mongodb").MongoClient;
// const http = require("http");
const app = express();
const port = 80;
var client;
var db;
const url = 'mongodb://localhost:27017/';


MongoClient.connect(url, function(err, vDB) {
    if (err) console.log(err);
    db = vDB.db("testDB");
    console.log(db)
  });
// new Promise((resolve,rejecr)=>{
    
//     console.log(client)
//     resolve(client);
// }).then((data)=>{
    
//     console.log(db)
// });

function select(col,intID){
    intID = parseInt(intID);
    return new Promise((resolve,reject)=>{
        const collection = db.collection(col);
        console.log(JSON.stringify({id:intID}))
        collection.find({'id':intID}).toArray((err,results)=>{
            if(err) reject(err);
            results["id"] = intID;
            console.log(results);
            resolve(results);
        });
    });
}

app.get('/',(req,res)=>{
    fs.readFile('./client/navigation.html','utf8',(err,data)=>{
        res.end(data);
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
    var proms = [select("buyOrders",req.params["itemNumber"]),select("sellOrders",req.params["itemNumber"])];
    Promise.all(proms).then((values)=>{
        // console.log(values[0])
        x = {}
        x["id"] = values[0][0]["id"];
        x["buys"] = values[0];
        x["sells"] = values[1];

        res.end(JSON.stringify(x));
    });
});

app.listen(port,()=>{
    console.log('listening to port '+port);
});