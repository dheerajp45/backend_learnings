const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken")

const JWT_SECRET = "dheerajp45";
const users = [];
function printDateTime() {
  const now = new Date();

  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  return `${date} -> ${time}`;
}



function auth(req,res,next){
    const token = req.headers.token;
    try {
          const decoded_info = jwt.verify(token,JWT_SECRET);
    if(decoded_info.username){
        req.username = decoded_info.username
        next();
    }
    else{
        res.json({
            msg:"you are not logged in"
        })
    }
    } catch (error) {
        res.status(401).json({
            msg:"invalid token"
        })
    }
  
    
}
function logger(req,res,next){
    console.log(`${req.method}  request came on ${printDateTime()}`);
    next();
}
app.post("/signup",logger,function (req,res){
    const username = req.body.username;
const password = req.body.password;
let userExists = false;

for(let i=0;i<users.length;i++){
    if(users[i].username==username){
        userExists = true;
    }
}

if(userExists){
    res.json({
        msg:'there is an account already with this username '
    })
}
else {
    users.push({
        username : username,
        password : password
    })
    res.json({
        msg: "you are successfully signed up !!"
    })
    console.log(users);
}
})



app.post("/signin",logger,function (req,res){
const username = req.body.username;
const password = req.body.password;

let foundUser = null;
for(let i= 0;i<users.length;i++){
    if(users[i].username == username && users[i].password == password){
        foundUser = users[i];
    }
}

if (foundUser) {
    const token = jwt.sign({
        username:username
    },JWT_SECRET);
    res.json({
        token: token
    })
}
else{
    res.status(403).send({
        msg:"invalid username or pwd"
    })
}
console.log(users);
})

app.get("/me",logger,auth,function (req,res){
// const token = req.headers.token;
// const decoded_info = jwt.verify(token,JWT_SECRET);


let foundUser = null;

for (let i =0;i<users.length;i++){
    if (users[i].username == req.username) {
        foundUser = users[i];
    }
}
if(foundUser){
    res.json({
        username:foundUser.username,
        password:foundUser.password
    })
}
else{
    res.json({
        msg: "invalid token"
    })
}
})


app.listen(3000);