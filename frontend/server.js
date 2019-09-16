/*
    This is the nodejs file used to serve the frontent to users.
*/

const express = require("express");
// const fs = require("fs");
const fs = require('fs');
const baseUrl = "http://www.landonrepp.com/index.html";
const app = express();
const port = 80;

app.get('/',(req,res)=>{
    // navigation redirect
    res.end(`<html><body><script>window.location.replace('${baseUrl}')</script><body></html>`)
});

app.get('/:path',(req,res)=>{
    console.log(req.url);
	console.log('./client/'+req.params['path']);
    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});


app.listen(port,()=>{
    console.log('listening to port '+port);
});