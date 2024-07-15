import {
  useContext,
  useState,
  useEffect,
  createContext,
  useRef,
  useCallback,
} from "react";
const WebSocketContext = createContext();
const WebSocketProvider = ({ children }) => {
  const [connection, setConnection] = useState(false);
  const wsRef = useRef(null);
  const [response, setResponse] = useState(null);
  const [name, setName] = useState(null);
  const [users, setUsers] = useState(null);
  // console.log("name", name);

  useEffect(() => {
    const ws = new WebSocket("ws://140.238.54.136:8080/chat/chat");
    wsRef.current = ws;
    setConnection(true);
    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });
    ws.addEventListener("message", (event) => {
      const res = JSON.parse(event.data);
      setResponse(res);
      console.log("websocket said:", res);
    });

    ws.addEventListener("close", () => {
      console.log("Connection is close");
      setConnection(false);
    });
    return () => {
      ws.close();
    };
  }, []);

  const SendMessage = (msg) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const RegisterContext = (username, password) => {
    const register_msg = {
      action: "onchat",
      data: {
        event: "REGISTER",
        data: {
          user: username,
          pass: password,
        },
      },
    };
    SendMessage(register_msg);
  };

  const LoginContext = (usename, password) => {
    const login_msg = {
      action: "onchat",
      data: {
        event: "LOGIN",
        data: {
          user: usename,
          pass: password,
        },
      },
    };
    SendMessage(login_msg);
  };

  const LogoutContext = () => {
    const logout_msg = {
      action: "onchat",
      data: {
        event: "LOGOUT",
      },
    };
    SendMessage(logout_msg);
  };

  const GetUserList = useCallback(() => {
    return new Promise((resolve) => {
      const getuser_msg = {
        action: "onchat",
        data: {
          event: "GET_USER_LIST",
        },
      };
      SendMessage(getuser_msg);
      if(connection) {
        wsRef.current.addEventListener("message", (event) => {
          const res = JSON.parse(event.data);
          resolve(res.data);
          wsRef.current.removeEventListener("message", this);
        });
      }
      console.log("chay 1 lan ben websocket");
    });
  }, [connection]);

  const value = {
    connection,
    response,
    name,
    users,
    GetUserList,
    setResponse,
    setName,
    RegisterContext,
    LoginContext,
    LogoutContext,
  };
  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
export { WebSocketContext, WebSocketProvider };
