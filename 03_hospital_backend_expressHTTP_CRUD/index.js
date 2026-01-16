const express = require('express');
// const { use } = require('react');
const app = express();

const users = [{
    name: "deelong",
    kidneys: [{
        healthy:false
    }]
}];


app.use(express.json());



app.get('/',function(req,res){
const deelongKidneys = users[0].kidneys;
const noOfKidneys = deelongKidneys.length;
let noOfHealthyKIdneys = 0;
for (let i = 0; i < deelongKidneys.length; i++) {
    if(deelongKidneys[i].healthy){
        noOfHealthyKIdneys= noOfHealthyKIdneys+1;
    }
}
const noOfUnhealthyKidneys = noOfKidneys-noOfHealthyKIdneys;
res.json({
    // deelongKidneys,
    noOfKidneys,
    noOfHealthyKIdneys,
    noOfUnhealthyKidneys
})
})

app.post('/',function(req,res){
const isHealthy = req.body.isHealthy;
users[0].kidneys.push({
    healthy: isHealthy 
})
res.json({
    msg: "done!!"
})
})

app.put('/',function(req,res){
for(let i=0;i<users[0].kidneys.length;i++){
    users[0].kidneys[i].healthy=true;
    // console.log(users[0].kidneys[i].healthy);
    
}
res.json({
    msg: "done!!"
})
})
function verifyUnhealthyKidney(){
    let atLeastOneUnhealthy = false;
    for(let i=0; i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atLeastOneUnhealthy=true;
        }
    }
    return atLeastOneUnhealthy;
}
app.delete('/',function(req,res){
    if(verifyUnhealthyKidney()){
    const newKidneys =[];
for(let  i=0; i<users[0].kidneys.length;i++){
    if(users[0].kidneys[i].healthy){
        newKidneys.push({healthy:true})
    }
}
users[0].kidneys=newKidneys;
res.json({
    msg:"done!"
})
}
else{
    res.status(411).json({
        msg: "you have no unhealthy kidneys"
    })
}
})



app.listen(3000)
