  import ChatItem from "./ChatItem";

  const ChatList = ({ users }) => {
    console.log("dang ben chat list");
    console.log("users la", users);

    // Kiểm tra nếu users là null hoặc undefined thì trả về một phần tử rỗng
    if (!users) {
      return <div>Loading...</div>; // Hoặc hiển thị một thông báo tải dữ liệu
    }

    return (
      <>
        {users.map((item, index) => (
          <ChatItem key={index} item={item} />
        ))}
      </>
    );
  };

  export default ChatList;
