
const express= require('express');
const cors=require('cors');
const dotenv= require("dotenv");
const { chats } = require('./data/data');

const app= express();
dotenv.config();


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.get("/api/chat",(req,res)=>{
    res.send(chats);
})

const PORT= process.env.PORT || 5000
app.listen(PORT,async()=>{
    try{
        console.log(`http://locahost:${PORT}`);
    }catch(err){
        console.log('Error in connecting DB',err);
    }
})