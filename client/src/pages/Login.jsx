import React, { useEffect, useReducer, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { WebSocketContext } from "../context/WebSoket";

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
    <>
      <div className="container">
        <h1 className="text-center">LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {loading && (
              <>
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>{" "}
              </>
            )}
            &nbsp;
            <span>Submit</span>
          </button>
        </form>
      </div>
    </>
  );
}
