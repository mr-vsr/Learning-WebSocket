import http from "http";
import express from "express";
// import path from "path";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods:["GET","POST"],
    }
});

//socket.io
// io.on('connection', (socket) => {
//     // console.log('a new user has connected', socket.id);
//     socket.on("user-message", message => {
//         // console.log('A new user message arrived ', message);
//         io.emit("message", message); //if any message comes send it to all
//     });
// });

// app.use(express.static(path.resolve("./public")));//serving static file

// app.get("/", (req, res) => {
//     return res.sendFile("/public/index.html");
// })

io.on("connection", (socket) => {
    console.log(`User connected`, socket.id);

    socket.on("join-room", data => socket.join(data));//creating a room

    socket.on("client-message", (data) => {
        // console.log(data);
        // socket.broadcast.emit("server-message", data.message);
        socket.to(data.room).emit("server-message", data);
    })
})

const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})