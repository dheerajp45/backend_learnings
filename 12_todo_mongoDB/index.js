const bcrypt = require("bcrypt")
const {z} = require("zod");
const express = require('express')
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const app = express()
const {UserModel , TodoModel} = require("./db")
mongoose.connect("mongodb+srv://dheerajpanyam:dheerajp45@cluster0.gdiziuc.mongodb.net/todo-dheerajp-4545")

const JWT_SECRET = "dheerajp45";
app.use(express.json()); 


function auth(req,res,next){
    const token = req.headers.token;
    try {
        const decoded_info = jwt.verify(token,JWT_SECRET)
        if(decoded_info){
            req.userId =decoded_info.id;
            next();
        }
        else{
                res.json({
                message:"you are not logged in"
            })
        }
    } catch (error) {
        res.status(403).json({
            message:"invalid token"
        })
    }
}



app.post("/signup", async function(req,res){

    const requiredBody = z.object({
        email:z.string().min(3).max(50).email(),
        name:z.string().min(3).max(30),
        password:z.string().min(3).max(30)
    })
// const parsedData = requiredBody.parse(req.body);
const parsedDataWithSuccess = requiredBody.safeParse(req.body);

if(!parsedDataWithSuccess.success){
    res.json({
        message:"incorrect Format",
        error: parsedDataWithSuccess.error
    })
    return
}

const email=req.body.username;
const password=req.body.password;
const name=req.body.name;

// if(typeof email !== String || email.length<5 || !email.includes("@")){
//     res.json({
//         message:"email incorrect"
//     })
// }



let errorThrown = false;
try {
    const hashedPassword = await bcrypt.hash(password, 5);
console.log(hashedPassword);

await UserModel.create({
    email: email,
    password:hashedPassword,
    name: name
})
} catch (e) {
    // console.log("error while adding in the DB");
    res.json({
    message: "user already exists"
})
errorThrown = true;
}
if(!errorThrown){
res.json({
    message: "your are signed up!!!"
})
}




})

app.post("/signin",async function(req,res){
    const email=req.body.username;
const password=req.body.password;

const user = await UserModel.findOne({
    email: email
})

if(!user){
    res.status(403).json({
        message:"user does not exist in the DB"
    })
}
const passwordMatch =await bcrypt.compare(password,user.password)
console.log(user);

if (passwordMatch) {
    const token=jwt.sign({
        id: user._id.toString()
    },JWT_SECRET);
    res.json({
        token: token
    })
} else {
    res.status(403).json({
        message: "incorrect credentials"
    })
}

})

app.post("/todo",auth, function(req,res){
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;
    TodoModel.create({
        title,
        userId,
        done
    })
    res.json({
        // userId: userId
        message :"todo created"
    })
})

app.get("/todo",auth,async function(req,res){
    const userId = req.userId;
    const todos = await TodoModel.find({
        userId:userId
    })
    res.json({
        // userId: userId
        todos
    })
})





app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})