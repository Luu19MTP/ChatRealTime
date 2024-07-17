import React ,{ useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import { WebSocketContext } from "../context/WebSoket";
import { Link } from "react-router-dom";
import "./Login.css"; // Ensure this CSS file includes the styles provided

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { RegisterContext, response, setResponse } =
    useContext(WebSocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    RegisterContext(username, password);
  };

  useEffect(() => {
    if (response) {
      setLoading(false);
      if (response.status === "error") {
        toast.error(response.mes);
      } else {
        toast.success("Creating a successful account");
        navigate("/login");
      }
      setResponse(null);
    }
  }, [response, navigate]);

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
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
            You have an account? <a href="#"> <Link to={"/login"} className="m-1 text-decoration-none">
              Login
            </Link></a>
          </p>
        </div>
      </form>
    </div>
  );
}
