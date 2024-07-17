import {
  Navbar,
  Nav,
  NavLink,
  Container,
  NavDropdown,
  Stack,
} from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { WebSocketContext } from "../context/WebSoket";
import toast from "react-hot-toast";
const NavBar = () => {
  const { name, setName, LogoutContext, response, setResponse } =
    useContext(WebSocketContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    LogoutContext();
    localStorage.clear();
    setName(null);
    setResponse(null);
    navigate("/login");
    // Reload trang
    location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("login_code")) {
      setName(localStorage.getItem("username"));
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to={"/"} className="text-decoration-none">
            <h2>Chat App</h2>
          </Link>
        </Navbar.Brand>
        <Nav>
          <Stack direction="horizontal">
            <div className="nav-link">
              {name && <span>Wellcome {name}</span>}
            </div>
            <Link to={"/login"} className="m-1 text-decoration-none">
              Login
            </Link>
            <Link to={"/signup"} className="m1 text-decoration-none">
              Register
            </Link>
            <Link className="m-1 text-decoration-none" to={"/chat"}>
              chat
            </Link>
            <Link className="m-1 text-decoration-none" to={"/test"}>
              test
            </Link>
            <div
              className="m-1 text-decoration-none nav-link"
              onClick={() => handleLogout()}
            >
              Logout
            </div>{" "}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
