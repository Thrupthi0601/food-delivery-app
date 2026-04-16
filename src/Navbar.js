import React from "react";
import { useTheme } from "./ThemeContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div style={{
      padding: "10px",
      background: "#ff6b00",
      display: "flex",
      justifyContent: "space-between",
      color: "white"
    }}>
      <div>
        <Link to="/" style={link}>Home</Link>
        <Link to="/profile" style={link}>Profile</Link>
      </div>

      <button onClick={toggleTheme} style={btn}>
        {dark ? "☀" : "🌙"}
      </button>
    </div>
  );
}

const link = {
  marginRight: "10px",
  color: "white",
  textDecoration: "none"
};

const btn = {
  background: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Navbar;
