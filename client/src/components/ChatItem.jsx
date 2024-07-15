const ChatItem = ({ user, setSelectedUser }) => {
  const handleClick = () => {
    setSelectedUser(user);
  };

  return (
    <div
      className="chat-item rounded-1 p-1 d-flex gap-3 text-dark align-items-center border-bottom mt-2"
      onClick={handleClick}
    >
      <div className="avatar">
        <i className="fa-solid fa-circle-user fs-1 p-0"></i>
      </div>
      <div className="info flex-grow-1">
        <div className="name">{user.name}</div>
        <div className="message">{user.messages.length > 0 ? user.messages[user.messages.length - 1].text : ''}</div>
      </div>
      <div className="time">
        <span style={{ fontSize: 12 }}>11:11</span>
      </div>
    </div>
  );
};

export default ChatItem;
