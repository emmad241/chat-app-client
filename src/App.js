import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('https://chat-app-vrfc.onrender.com/');

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
        const data = {
          room: room,
          author: username,
          message: "has joined the chat",
          time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
        };

        socket.emit('joinRoom', data);
        setJoined(true);
    }
  };

  return (
      <div className="App">
        {!joined ? (
          <div className="joinContainer">
            <header className="header">Join A Chat Room</header>
            <input
              type="text"
              placeholder="Username"
              onChange={event => setUsername(event.target.value)}
              className="inputField"
            />
            <input
              type="text"
              placeholder="Room"
              onChange={event => setRoom(event.target.value)}
              onKeyDown={event => event.key === 'Enter' && joinRoom()}
              className="inputField"
            />
            <button onClick={joinRoom} className="joinButton">Join Room</button>

            <footer class="joinFooter">
              <p>Created with React, Node.js, and Socket.io.<br></br>View the server code <a href="https://github.com/emmad241/chat-app">here</a>, and client code <a href="https://github.com/emmad241/chat-app-client">here.</a></p>
            </footer>
          </div>
        ) : (
          <>
            <Chat socket={socket} username={username} room={room} />
          </>
        )}
      </div>
    );
}

export default App;
