import React, { useState } from 'react';

export default function ChatContent() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Gửi tin nhắn của người dùng
      setMessages([...messages, { text: message, isMyMessage: true }]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
          <div className="p-2 flex-grow-1 d-flex flex-column">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="message"
                style={{
                  alignSelf: msg.isMyMessage ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.isMyMessage ? '#DCF8C6' : '#FFF',
                  borderRadius: '10px',
                  padding: '10px',
                  margin: '5px',
                  maxWidth: '60%',
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="d-flex p-2">
            <input
              className="flex-fill rounded"
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="btn" onClick={handleSend}>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
    </>
  );
}
