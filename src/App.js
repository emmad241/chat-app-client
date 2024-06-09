import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3000');

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit('joinRoom', { username, room });
      console.log(`Joined room ${room}`);
    }
  };

  return (
    <div className="App">
      <h3>ChatApp</h3>
      <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)} />
      <input type="text" placeholder="Room" onChange={event => setRoom(event.target.value)} />
      <button onClick={joinRoom}>Join Room</button>

      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
