
const express= require('express');
const cors=require('cors');
const { chats } = require('./data/data');

const app= express();


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.get("/api/chat",(req,res)=>{
    res.send(chats);
})

app.listen(5000,async()=>{
    try{
        console.log("http://locahost:5000");
    }catch(err){
        console.log('Error in connecting DB',err);
    }
})