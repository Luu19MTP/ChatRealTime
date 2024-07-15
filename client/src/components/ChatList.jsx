  import ChatItem from "./ChatItem";

  const ChatList = ({ users,saveUsername }) => {


    // Kiểm tra nếu users là null hoặc undefined thì trả về một phần tử rỗng
    if (!users) {
      return <div>Loading...</div>; // Hoặc hiển thị một thông báo tải dữ liệu
    }

    return (
      <>
        {users.map((item, index) => (
          <ChatItem key={index} item={item} saveUsername={saveUsername}/>
        ))}
      </>
    );
  };

  export default ChatList;
