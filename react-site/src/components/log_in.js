import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./log_in.css";
import BackButton from "./BackButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {email, password};
    try{
      fetch('http://localhost:3001/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
      })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        if(data.main){ navigate("/main");}
      });
    }
    catch(err) {console.log(err);}
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>    
        <input type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <br></br><br></br><br></br>
        <label htmlFor="password">Password: </label>
        <input type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>
        <br></br>
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
      </form>      
      <br></br>
      <p id="msg">{message}</p>
      <br></br>
      <div className="register-section">
        If you still don't have an account{" "}
        <a href="/login/register">Click here to register</a>
        <BackButton/>
      </div>
    </div>
  );
}

export default Login;
