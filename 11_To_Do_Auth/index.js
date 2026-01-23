const express = require('express')
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
app.use(express.json());
const JWT_SECRET = "dheerajp45";
const users =[];
let todos = [];
let todoId = 0;

function auth(req,res,next){
    const token = req.headers.token
    try {
        const decoded_info = jwt.verify(token,JWT_SECRET)
        if (decoded_info.username) {
            req.username = decoded_info.username;
            next();
        }
        else{
            res.json({
                message:"you are not logged in"
            })
        }
    } catch (error) {
        res.status(401).json({
            message:"invalid token"
        })
    }
}

app.post('/signup',function (req,res){
const username=req.body.username;
const password=req.body.password;

let userExists = false;
for (let i = 0; i < users.length; i++) {
    if(users[i].username==username)
    {
        userExists =true;
    }}
    if (userExists) {
        res.json({
            message:"There is an account already created with this username please sign in with your account"
        })
    }
    else{
            users.push({
                username,
                password
            })
            res.json({
                message:`hey ${username} your account is sucessfully created `
            })
            console.log(users);
            
        }
    

})

app.post('/signin',function (req,res){
const username=req.body.username;
const password=req.body.password;

let foundUser = null;

for (let i = 0; i < users.length; i++) {
    if(users[i].username==username && users[i].password == password)
    {
        foundUser = users[i]
    }}
    if(foundUser){
        const token = jwt.sign({
            username:username
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    else
    {
        res.status(403).send({
            message:"invalid username or pwd"
        })
    }

    console.log(users);
    
})

app.post('/todos',auth,function(req,res){
    const title = req.body.title;
    todoId = todoId+1;
    todo={
        id:todoId,
        title:title,
        completed:false,
        username:req.username
    }
    todos.push(todo)
    res.json({
        message:`done creating a todo 
        id -->${todoId}
        title -->${title}
        username -->${req.username}
        ------
        `
    })
    console.log(todos)
})

app.get('/todos',auth,function(req,res){
    username= req.username;
    
    let user_todos=[];
    for(let i=0;i<todos.length;i++)
        if (todos[i].username==username) {
            user_todos.push(todos[i])
        }
        res.json({ todos: user_todos });
})

app.put('/todos/:id',auth,function(req,res){
    username= req.username;
    let updated = false;
    const id = parseInt(req.params.id);
    for(let i=0;i<todos.length;i++){
        if(todos[i].id===id&&todos[i].username==username){
            todos[i].completed=true;
            updated=true;
            break;
        }
    }
    if (updated) {
    res.json({ message: "Todo marked as completed." });
} else {
    res.status(404).json({ message: "Todo not found or not yours." });
}
})

app.delete("/todos/:id",auth,function(req,res){
    username= req.username;
    const initialLength = todos.length;
    const id = parseInt(req.params.id);
    todos=todos.filter(todo=> todo.id!==id);
      if (todos.length < initialLength) {
        res.json({ message: "Todo deleted successfully." });
    } else {
        res.status(404).json({ message: "Todo not found or not yours." });
    }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

