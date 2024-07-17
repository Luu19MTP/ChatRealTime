import ChatItem from "./ChatItem";
import "./ChatItem.css";

const ChatList = ({ users, saveUsername, saveType }) => {

  // Kiểm tra nếu users là null hoặc undefined thì trả về một phần tử rỗng
  if (!users) {
    return <div>Loading...</div>; // Hoặc hiển thị một thông báo tải dữ liệu
  }

  return (
    <>
      <div className="wp-chat-list">
        {users.map((item, index) => (
          <ChatItem
            key={index}
            item={item}
            saveUsername={saveUsername}
            saveType={saveType}
          />
        ))}
      </div>
    </>
  );
};

export default ChatList;
