import React, { useState } from "react";

function Login({ setUserRole }) {
  const [role, setRole] = useState("customer");

  const handleLogin = () => {
  setIsLoggedIn(true);
  localStorage.setItem("isLoggedIn", "true"); // ✅ save login
};


  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🍔 Food App Login</h2>

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="restaurant">Restaurant</option>
        <option value="delivery">Delivery</option>
      </select>

      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
