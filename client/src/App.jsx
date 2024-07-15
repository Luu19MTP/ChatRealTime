import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import Chat from "./pages/Chat/Chat";
import { WebSocketProvider } from "./context/WebSoket";
import Test from "./Test";

function App() {
  return (
    <>
      <WebSocketProvider>
          <Toaster position="bottom-right" />
          <NavBar />
          <Container className="text-secondary">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/test" element={<Test />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
      </WebSocketProvider>
    </>
  );
}

export default App;
