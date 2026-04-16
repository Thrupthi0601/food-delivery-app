import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const foods = JSON.parse(localStorage.getItem("foods")) || [];

  const addToCart = (item) => setCart([...cart, item]);

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🍔 Customer</h2>

      <button onClick={() => navigate("/orders")}>Orders</button>

      <h3>Menu</h3>

      {foods.map((f, i) => (
        <div key={i}>
          {f.name} ₹{f.price}
          <button onClick={() => addToCart(f)}>ADD</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button onClick={() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("totalAmount", total);
        navigate("/payment");
      }}>
        Pay
      </button>
    </div>
  );
}

export default CustomerHome;
