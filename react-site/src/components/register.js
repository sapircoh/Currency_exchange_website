import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {email, password};
    try{
      fetch('http://localhost:3001/login/register',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
      })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        if(data.main){ navigate("/login");}
      });
    }
    catch(err) {console.log(err);}
  };


  return (
    <div className="register-container">
      <h2>Register</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <br></br>
        <br></br>
        <label htmlFor="password">password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <br></br>
        <br></br>
        <button type="submit">Register</button>
        <BackButton/>
      </form>
     <br></br>
     <br></br>
     <br></br>
     <p id="msg">{message}</p>
    </div>
  );
}

export default Register;
