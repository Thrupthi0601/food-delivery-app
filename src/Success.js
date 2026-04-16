import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("cart"); // clear cart
      navigate("/");
    }, 2000);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>✅ Order Placed!</h2>
    </div>
  );
}

export default Success;
