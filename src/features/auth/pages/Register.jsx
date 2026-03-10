import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Register() {
   const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    username:"",
    email:"",
    password:""
  });

  const handleChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister( userDetail );
    setUserDetail("");
    navigate("/");
  };
  if(loading){
    return (<main><h1>Loading...</h1></main>) 
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              id="username"
              onChange={handleChange}
              value={userDetail.username}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              id="email"
              onChange={handleChange}
              value={userDetail.email}
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
              value={userDetail.password}
              required
            />
          </div>
          <button className="button primary-button">Register</button>
        </form>
        <p>
          Already have an Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
