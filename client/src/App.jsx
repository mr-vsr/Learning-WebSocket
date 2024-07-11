import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:9000");

function App() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    console.log(messageReceived);
    socket.emit("client-message",{message});
  }

  useEffect(() => {
    socket.on("server-message", (data) => {
      setMessageReceived(data);
    });
  }, []);

  return (
    <>
      <div className="App">
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
