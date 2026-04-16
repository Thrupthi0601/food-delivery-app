import React from "react";
import { useNavigate } from "react-router-dom";

function Payment({ cart, total, userLocation, clearCart }) {
  const navigate = useNavigate();

  const handlePayment = () => {
    const order = {
      id: Date.now(),
      items: cart,
      total,
      status: "Preparing",
      eta: 20,
      driver: {
        name: "Ravi",
        phone: "9876543210",
        location: { lat: 12.97, lng: 77.59 }
      }
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...orders, order]));

    clearCart();
    navigate(`/tracking/${order.id}`);
  };

  return (
    <div>
      <h2>Payment</h2>
      <p>Total: ₹{total}</p>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
}

export default Payment;
