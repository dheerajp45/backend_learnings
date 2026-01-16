const express = require('express')
const app =  express()


function isOldEnough(age){
    if (age>=14){
        return true;
    }
    else{
        return false;
    }
}

function isOldEnoughMiddleware(req,res,next){
    const age = req.query.age;
    if (age>=14){
        next();
    }
    else{
        res.json({
        msg: "your age is not enough for this ride from middleware"
    })
    }
}
// app.use(isOldEnoughMiddleware);
app.get('/ride1',isOldEnoughMiddleware,function(req,res){
 res.json({
        msg: "you have riden the ride 1 after middleware"
    })
})

app.get('/ride2',isOldEnoughMiddleware,function(req,res){
 res.json({
        msg: "you have riden the ride 2 after middleware"
    })
})




app.listen(3000)
// app.get('/ride1',function(req,res){
//     if(isOldEnough(req.query.age)){
//  res.json({
//         msg: "you have riden the ride 1"
//     })
//     }
//     else{
//         res.status(411).json({
//             msg: "sorry not age enough"
//         })
//     }
   
// })
// app.get('/ride2',function(req,res){
//     if(isOldEnough(req.query.age)){
//  res.json({
//         msg: "you have riden the ride 2"
//     })
//     }
//     else{
//         res.status(411).json({
//             msg: "sorry not age enough"
//         })
//     }
   
// })



