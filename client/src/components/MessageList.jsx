import MessageItem from "./MessageItem";

const MessageList = ({ chats }) => {
  console.log(chats);
  return (
    <>
      {chats.reverse().map((item) => {
        return <MessageItem key={item.id} username={item.name} value={item.mes} />;
      })}
    </>
  );
};

export default MessageList;

// sfc
