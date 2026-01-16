const express = require("express");

const app = express();
// app.get('/', function(req,res){
//     console.log("dheeraj panyam");
//     res.send("dheeraj hi heeloo")
// })
app.get('/',function(req,res){
    console.log(`Received a ${req.method} 
        at URL -> ${req.url}
        baseURL -> is ${req.baseUrl}
        at the time of`);
    
})
app.listen(3000);