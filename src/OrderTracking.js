import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function OrderTracking() {
  const [status, setStatus] = useState("Preparing");
  const [eta, setEta] = useState(20);
  const [position, setPosition] = useState([12.9716, 77.5946]); // Default Bangalore
  const navigate = useNavigate();

  // 🚚 Simulate delivery movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => [
        prev[0] + 0.0005,
        prev[1] + 0.0005
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 📦 Status update
  useEffect(() => {
    const steps = ["Preparing", "Picked", "On the Way", "Delivered"];
    let i = 0;

    const interval = setInterval(() => {
      if (i < steps.length) {
        setStatus(steps[i]);
        setEta((prev) => prev - 5);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🔄 Auto return to home
  useEffect(() => {
  if (status === "Delivered") {
    setTimeout(() => {
      navigate("/", { replace: true }); // ✅ GO BACK TO HOME
    }, 3000);
  }
}, [status, navigate]);


  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Order Tracking</h2>

      <h3>Status: {status}</h3>
      <h4>ETA: {eta > 0 ? eta : 0} mins</h4>

      {/* 🗺️ MAP */}
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "400px", width: "100%", marginTop: "20px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>🚚 Delivery Boy</Popup>
        </Marker>
      </MapContainer>

      {status === "Delivered" && (
        <h3 style={{ color: "green" }}>
          ✅ Delivered! Redirecting...
        </h3>
      )}
    </div>
  );
}

export default OrderTracking;
