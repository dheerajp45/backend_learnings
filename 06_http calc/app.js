const express = require("express");

const app = express();
let numOfReqs = 0;
app.use(function(req,res,next) {
    console.log("before="+numOfReqs);
    numOfReqs = numOfReqs +1;
    console.log("after="+numOfReqs);
    next();
})
app.get("/sum/:firstArg/:secondArg", function(req, res) {
// const a= parseInt(req.query.a);
// const b= parseInt(req.query.b);
const a = parseInt(req.params.firstArg);
const b = parseInt(req.params.secondArg);
ans = a + b;
res.json({
    ans : a + b
})
});

app.get("/multiply/:firstArg/:secondArg", function(req, res) {
const a = parseInt(req.params.firstArg);
const b = parseInt(req.params.secondArg);
ans = a + b;
res.json({
    ans : a * b
})
});

app.get("/divide/:firstArg/:secondArg", function(req, res) {
const a = parseInt(req.params.firstArg);
const b = parseInt(req.params.secondArg);
ans = a + b;
res.json({
    ans : a / b
})
});

app.get("/subtract/:firstArg/:secondArg", function(req, res) {
const a = parseInt(req.params.firstArg);
const b = parseInt(req.params.secondArg);
ans = a + b;
res.json({
    ans : a - b
})
});

app.listen(3000);