const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("client-location-send", (data)=>{
      console.log("data", data);
      io.emit("server-location-send", data);
    })
});

app.get('/', (req, res)=>{
    res.status(200).json("Hii from backend server")
})

server.listen(8000, () => {
    console.log("Server running on port 8000");
});
