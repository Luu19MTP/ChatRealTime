import React, { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react";
import { WebSocketContext } from "../context/WebSoket";

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
  // neu phan hoi ve signup loi=> toast,
  //neu chuyen huong , tuong duong voi signup thanh cong=> toast
  return (
    <>
      <div className="container">
        <h1 className="text-center">REGISTER</h1>
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
