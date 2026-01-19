const express = require("express");
const app = express();
app.use(express.json());
// const cors = require("cors");
// app.use(cors());

app.get('/',function(req,res){
    // res.send(`<h1>hi hello dheeraj here</h1>`)
    res.sendFile(__dirname+"/public/index.html")
})
app.post("/sum",function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        answer: a+b
    })
})
// 
app.listen(3000,function(){
    console.log(`
        hi hello 
        server running on 
                |

        port 3000`);
    
})
































// app.post('/sum/:firstArg/:secondArg',function(req,res){
//     const a = parseInt(req.params.firstArg);
//     const b = parseInt(req.params.secondArg);
//     // http://localhost:3000/sum/5/6
//     ans = a + b;
// res.json({
//     ans : a + b
// })
// })

// app.post('/sub',function(req,res){
//     const c= parseInt(req.query.c);
// const d= parseInt(req.query.d);
// // http://localhost:3000/sub/?c=5&d=2
// ans = c - d;
// res.json({
//     ans : c - d
// })
// })