import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3000');

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
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
