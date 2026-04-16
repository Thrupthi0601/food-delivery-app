import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login / Signup</h2>
      <input placeholder="Email" onChange={e => setUser({...user, email:e.target.value})} /><br/><br/>
      <input type="password" placeholder="Password" onChange={e => setUser({...user, password:e.target.value})} /><br/><br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Auth;
