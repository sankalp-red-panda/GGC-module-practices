const express=require("express");
const app=express();
const jwt=require('jsonwebtoken');
const bodyParser=require("body-parser");

app.use(bodyParser.json());

const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
];
const accessTokenSecret='verySecrectKey';

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    const user=users.find(u=>{return u.username===username && u.password===password});

    if(user)
    {
        const accessToken=jwt.sign({username:user.username, role:user.role},accessTokenSecret);
        res.json({accessToken});
    }
    else{
        res.send('incorrect passworkd or username');
    }
})

app.listen(5000,()=>{console.log("app running on port 5000");})