import { createContext, Children, useState } from "react";
const FriendContext = createContext();

const FriendContextProvider = ({ children }) => {
  const [friend, setFriend] = useState([]);
  var ws = new WebSocket("ws://140.238.54.136:8080/chat/chat");
  ws.addEventListener("open", () => {
    const get_user_msg = {
      action: "onchat",
      data: {
        event: "GET_USER_LIST",
      },
    };
  });
  return;
  <FriendContext.Provider value={value}>{children}</FriendContext.Provider>;
};

export { FriendContext, FriendContextProvider };
