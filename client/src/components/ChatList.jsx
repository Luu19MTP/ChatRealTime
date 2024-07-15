import ChatItem from "./ChatItem";

const ChatList = ({ users, setSelectedUser }) => {
  return (
    <div className="chat-list">
      {users.map(user => (
        <ChatItem
          key={user.name}
          user={user}
          setSelectedUser={setSelectedUser}
        />
      ))}
    </div>
  );
};

export default ChatList;
