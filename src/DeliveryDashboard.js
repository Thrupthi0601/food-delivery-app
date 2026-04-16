import React, { useEffect, useState } from "react";

function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, []);

  const updateStatus = (i, status) => {
    const updated = [...orders];
    updated[i].status = status;
    localStorage.setItem("orders", JSON.stringify(updated));
    setOrders(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛵 Delivery Dashboard</h2>

      {orders.map((o, i) => (
        <div key={i}>
          <p>₹{o.total}</p>
          <p>Status: {o.status || "Pending"}</p>

          <button onClick={() => updateStatus(i, "Picked")}>Picked</button>
          <button onClick={() => updateStatus(i, "Delivered")}>Delivered</button>
        </div>
      ))}
    </div>
  );
}

export default DeliveryDashboard;
