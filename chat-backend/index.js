
const express= require('express');
const cors=require('cors');
const dotenv= require("dotenv");
const connectingDB = require('./config/db');

const app= express();
dotenv.config();
connectingDB();



app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("API is running");
})



const PORT= process.env.PORT || 5000
app.listen(PORT,
        console.log(`http://locahost:${PORT}`)
    );