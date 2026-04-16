import React, { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <p>{user?.email}</p>

      <h3>Orders</h3>
      {orders.map(o => (
        <div key={o.id}>
          <p>₹{o.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;
