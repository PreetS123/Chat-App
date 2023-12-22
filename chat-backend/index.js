
const express= require('express');
const cors=require('cors');
const dotenv= require("dotenv");
const connectingDB = require('./config/db');
const userRoutes= require("./routes/userRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { chatRouter } = require('./routes/chatRoutes');
const  messageRoutes  = require('./routes/messageRoutes');

const app= express();
dotenv.config();
connectingDB();

app.use(express.json()); // to accept json data
app.use(cors());

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRouter);
app.use('/api/msg',messageRoutes);

app.use(notFound);
app.use(errorHandler);


const PORT= process.env.PORT || 5000
app.listen(PORT,
        console.log(`http://locahost:${PORT}`)
    );