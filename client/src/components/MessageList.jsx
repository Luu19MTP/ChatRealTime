import MessageItem from "./MessageItem";

const MessageList = ({ chats, chatRoom }) => {
  console.log(chats);
  return (
    <>
      {chats.reverse().map((item) => {
        return <MessageItem key={item.id} username={item.name} value={item.mes}  />;
      })}

      {chatRoom.reverse().map((item) => {
        return <MessageItem key={item.id} username={item.name} value={item.mes}  />;
      })}
    </>
  );
};

export default MessageList;

// sfc
