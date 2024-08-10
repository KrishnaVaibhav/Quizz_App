import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  console.log(useAuth());

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://zgfx7mja8b.execute-api.us-east-1.amazonaws.com/dev/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setMessage("Login successful!");
        localStorage.setItem("token", response.data.token);
        const data = { user: email, token: response.data.token };
        setTimeout(() => {
          navigate("/");
          login(data.user);
        }, 2000);
      } else {
        setMessage(`Login failed! ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(`Login failed! ${error.response.data.message}`);
    }
  };

  return (
    <div className="container glass-effect center-div p-5">
      <h2>Login</h2>
      {message && <p className="message-text">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="my-3 btn btn-primary">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
