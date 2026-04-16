import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Tracking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let found = orders.find((o) => o.id === Number(id));

    if (!found) return;

    setOrder({ ...found });

    const interval = setInterval(() => {
      // 🔥 UPDATE DRIVER LOCATION + ETA
      const updatedOrder = {
        ...found,
        driver: {
          ...found.driver,
          location: {
            lat: found.driver.location.lat + 0.001,
            lng: found.driver.location.lng + 0.001,
          },
        },
        eta: found.eta - 1,
      };

      // ✅ STATUS LOGIC
      if (updatedOrder.eta <= 15) updatedOrder.status = "Out for Delivery";
      if (updatedOrder.eta <= 5) updatedOrder.status = "Arriving";

      if (updatedOrder.eta <= 0) {
        updatedOrder.status = "Delivered";
        updatedOrder.eta = 0;
      }

      // 🔥 UPDATE LOCALSTORAGE
      const updatedOrders = orders.map((o) =>
        o.id === updatedOrder.id ? updatedOrder : o
      );

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      setOrder(updatedOrder);
      found = updatedOrder;

      // 🔥 AUTO REDIRECT AFTER DELIVERY
      if (updatedOrder.status === "Delivered") {
        clearInterval(interval);

        setTimeout(() => {
          navigate("/");
        }, 3000); // wait 3 seconds
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [id, navigate]);

  if (!order) return <h3>Loading...</h3>;

  // 🎯 PROGRESS BAR %
  const getProgress = () => {
    if (order.status === "Preparing") return 25;
    if (order.status === "Out for Delivery") return 60;
    if (order.status === "Arriving") return 85;
    if (order.status === "Delivered") return 100;
    return 0;
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          maxWidth: "500px",
          margin: "auto",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>📦 Order Tracking</h2>

        <p><b>Status:</b> {order.status}</p>
        <p><b>ETA:</b> {order.eta} mins</p>

        {/* 🔥 PROGRESS BAR */}
        <div
          style={{
            background: "#ddd",
            borderRadius: "10px",
            height: "10px",
            margin: "10px 0",
          }}
        >
          <div
            style={{
              width: `${getProgress()}%`,
              height: "100%",
              background: "#28a745",
              borderRadius: "10px",
              transition: "0.5s",
            }}
          />
        </div>

        <p><b>Driver:</b> {order.driver?.name}</p>
        <p><b>Phone:</b> {order.driver?.phone}</p>

        {/* 🌍 GOOGLE MAP */}
        <iframe
          title="Live Delivery Map"
          width="100%"
          height="300"
          style={{ borderRadius: "10px" }}
          src={`https://maps.google.com/maps?q=${order.driver?.location.lat},${order.driver?.location.lng}&z=15&output=embed`}
        />

        {/* ✅ DELIVERY BUTTON */}
        {order.status === "Delivered" && (
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "10px",
              background: "#ff6b00",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🏠 Go to Home
          </button>
        )}
      </div>
    </div>
  );
}

export default Tracking;
