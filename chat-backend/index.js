
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
const server=app.listen(PORT,
        console.log(`http://locahost:${PORT}`)
    );

    const io= require('socket.io')(server,{
        pingTimeout:60000,
        cors:{
            origin:"http://localhost:3000",
        }
    });

    io.on("connection",(socket)=>{
       console.log("connected to socket.io");
       socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit('connected');
       });

       socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("User joined room"+ room)
       });

       socket.on('new message',(newMessageReceived)=>{
        var chat= newMessageReceived.chat;
        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user=>{
            if(user._id==newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received",newMessageReceived)
        });
       });
    });