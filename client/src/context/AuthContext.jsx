import { Children, createContext, useState } from "react";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const loginContext = (login_code, username) => {
    setUser(username);
    localStorage.setItem("login_code", login_code);
    localStorage.setItem("username", username);
  };

  const logoutContext = () => {
    var ws = new WebSocket("ws://140.238.54.136:8080/chat/chat");
    ws.addEventListener("open", () => {
      const logout_msg = {
        action: "onchat",
        data: {
          event: "LOGOUT",
        },
      };
      ws.send(JSON.stringify(logout_msg));

      ws.addEventListener("message", (event) => {
        const res = JSON.parse(event.data);
        console.log(res);
      });
    });
    setUser("");
    localStorage.clear();
  };
  const value = {
    user,
    loginContext,
    logoutContext,
  };
  console.log(user);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
