import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:9000");

function App() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    console.log(messageReceived);
    socket.emit("client-message",{message,room});
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join-room", room);
    }
  };

  useEffect(() => {
    socket.on("server-message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <>
      <div className="App">
        <input
          placeholder="Room Number..." 
          onChange={(event)=> setRoom(event.target.value)}
          />
        <button onClick={joinRoom}>Join Room</button>
        <input
          placeholder="Enter Your Message" 
          onChange={(event)=> setMessage(event.target.value)}
          />
        <button onClick={sendMessage}>Send</button>
        <h1>Message:</h1>
        {messageReceived}
      </div>
    </>
  )
}

export default App
