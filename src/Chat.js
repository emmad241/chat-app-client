import React from 'react';

function Chat ({socket, username, room}) {
  const [currentMessage, setCurrentMessage] = React.useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      };

      await socket.emit('sendMessage', messageData);
    }
  };

  return (
    <div>
      <div class="chat-header">
        <p>Live Chat</p>
      </div>
      <div class="chat-body"></div>
      <div class="chat-footer">
        <input
          type="text"
          placeholder="Enter your message..."
          onChange={event => setCurrentMessage(event.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;