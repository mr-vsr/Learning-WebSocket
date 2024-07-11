import http from "http";
import express from "express";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//socket.io
io.on('connection', (socket) => {
    // console.log('a new user has connected', socket.id);
    socket.on("user-message", message => {
        // console.log('A new user message arrived ', message);
        io.emit("message", message); //if any message comes send it to all
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
})

const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})