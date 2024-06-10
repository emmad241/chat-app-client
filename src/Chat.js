import React, { useState, useEffect } from 'react';
import './Chat.css';

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [headerColour, setHeaderColour] = useState("")

  useEffect(() => {
    //get random colour for header
    const getRandomColour = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
  
      
    setHeaderColour(getRandomColour())

    socket.on('receiveMessage', (message) => {
      console.log(message);
      if (message.position !== 'messageCenter') {
        if (message.author === username) {
            message.position = 'messageLeft';
        }else{
            message.position = 'messageRight';
        }
      }
      setMessageList((messageList) => [...messageList, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [socket, username]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      };

      await socket.emit('sendMessage', messageData);
      setMessage("")
    }
  };

  const leaveRoom = async () => {
    const messageData = {
        room: room,
        author: username,
        message: "has left the chat",
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
        position: 'messageCenter'
    };

    await socket.emit('leaveRoom', messageData)
    window.location.reload();
  }

  return (
    <div className="chatContainer">
      <div className="chatHeader" style={{ backgroundColor: headerColour }}>
        <h3>Room: {room}</h3>
      </div>
      <div className="chatBody">
        {messageList.map((msg, index) => (
          <div key={index} className={msg.position}>
            <strong>{msg.author}</strong>: {msg.message}<br></br><em>{msg.time}</em>
          </div>
        ))}
      </div>
      <div className="chatFooter">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="messageInput"
        />
        <button onClick={sendMessage} className="sendButton">Send</button>
        <button onClick={leaveRoom} className="leaveButton">Leave</button>
      </div>
    </div>
  );
}

export default Chat;
