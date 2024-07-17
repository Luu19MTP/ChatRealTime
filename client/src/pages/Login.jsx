import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import { WebSocketContext } from "../context/WebSoket";
import { Link } from "react-router-dom";
import "./Login.css"; // Ensure this CSS file includes the styles provided

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setName, setResponse, response, LoginContext } =
    useContext(WebSocketContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    LoginContext(username, password);
  };

  useEffect(() => {
    setLoading(false);
    if (response) {
      if (response.status === "error") {
        toast.error(response.mes);
      } else if (response.status === "success") {
        toast.success("Login success");
        localStorage.setItem("login_code", JSON.stringify(response.data));
        localStorage.setItem("username", username);
        setName(username);
        navigate("/chat");
      }
      setResponse(null);
    }
  }, [response, navigate]);

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">
          {loading && (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          &nbsp;Submit
        </button>
        <div className="register-link">
          <p>
            Don't have an account? <a href="#"><Link to={"/signup"} className="m1 text-decoration-none">
              Register
            </Link></a>
          </p>
        </div>
      </form>
    </div>
  );
}
