import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";
function Login() {
   const { loading, handleLogin } = useAuth();
const navigate =useNavigate();
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   await handleLogin(detail);
    setDetail("")
 navigate("/")
  };

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              id="email"
              onChange={handleChange}
              value={detail.email}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={detail.password}
              required
            />
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an Account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
