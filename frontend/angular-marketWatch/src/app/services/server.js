const express = require("express");
// const fs = require("fs");
const fs = require('fs');
// var mysql = require('mysql');
// const http = require("http");
// var cors = require('cors')
const app = express();

app.get('/:path',(req,res)=>{
    console.log(req.url);

    fs.readFile('./client/'+req.params['path'], 'utf8', function(err, contents) {
        res.end(contents);
    });
});


app.listen(port,()=>{
    console.log('listening to port '+port);
});