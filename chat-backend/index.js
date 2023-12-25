
const express= require('express');
const cors=require('cors');
const dotenv= require("dotenv");
const connectingDB = require('./config/db');
const userRoutes= require("./routes/userRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { chatRouter } = require('./routes/chatRoutes');
const  messageRoutes  = require('./routes/messageRoutes');
const path=require('path');

const app= express();
dotenv.config();
connectingDB();

app.use(express.json()); // to accept json data
app.use(cors());


app.use('/api/user',userRoutes);
app.use('/api/chat',chatRouter);
app.use('/api/msg',messageRoutes);

//-------------Deployment--------------
const __dirname1= path.resolve();
if(process.env.NODE_ENV==="production"){
   app.use(express.static(path.join(__dirname1,"/client/build")));
   app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"client","build","index.html"));
   });
}else{
    app.get('/',(req,res)=>{
        res.send("API running successfully");
    });
}
//-------------Deployment--------------

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
      
       socket.on('typing',(room)=>socket.in(room).emit("typing"));
 
       socket.on('stop typing',(room)=>socket.in(room).emit("stop typing"));


       socket.on('new message',(newMessageReceived)=>{
        var chat= newMessageReceived.chat;
        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user=>{
            if(user._id==newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received",newMessageReceived)
        });
       });

       socket.off("setup",()=>{
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
       })
    });