//server.js
//npm i socket.io
const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require = ("cors");
app.use(cors())
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methodds:["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.ids}`);

    //room
    socket.on("sjoin_room", (data) =>{
        //console.log(data);
        socket.join(data);
    })

    //avec room
    socket.on("send_message", (data) =>{
        //console.log(data);
        socket.to(data.room).emit("receive_message", data);
    })

    //sans room
    socket.on("send_message", (data) =>{
        //console.log(data);
        socket.broadcast.emit("receive_message", data);
    })

})

//pour tester en console: node server.js
server.listen(3000,()=>{
    console.log("SERVER IS RUNNING");
})