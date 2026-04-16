import React, { useState, useEffect } from "react";

function RestaurantDashboard() {

  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);

  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    category: "Breakfast",
    img: ""
  });

  const categories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Beverages"];

  // 🔄 LOAD DATA
  useEffect(() => {
    const savedFoods = JSON.parse(localStorage.getItem("foods")) || [];
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    setFoods(savedFoods);
    setOrders(savedOrders);
  }, []);

  // ➕ ADD FOOD
  const addFood = () => {
    if (!newFood.name || !newFood.price) {
      alert("Fill all fields");
      return;
    }

    const updatedFoods = [...foods, { ...newFood, id: Date.now() }];

    setFoods(updatedFoods);
    localStorage.setItem("foods", JSON.stringify(updatedFoods));

    setNewFood({ name: "", price: "", category: "Breakfast", img: "" });
  };

  // ✅ ACCEPT ORDER
  const acceptOrder = (id) => {
    const updatedOrders = orders.map(order =>
      order.id === id
        ? {
            ...order,
            status: "Accepted",
            driver: {
              name: "Ravi",
              phone: "9876543210",
              location: { lat: 12.9716, lng: 77.5946 }
            }
          }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // 🚚 MARK READY
  const markReady = (id) => {
    const updatedOrders = orders.map(order =>
      order.id === id
        ? { ...order, status: "Ready for Pickup" }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>🍽️ Restaurant Dashboard</h2>

      {/* ADD FOOD */}
      <h3>Add Food Item</h3>

      <input
        placeholder="Food Name"
        value={newFood.name}
        onChange={(e) =>
          setNewFood({ ...newFood, name: e.target.value })
        }
      />

      <input
        placeholder="Price"
        value={newFood.price}
        onChange={(e) =>
          setNewFood({ ...newFood, price: e.target.value })
        }
      />

      <select
        value={newFood.category}
        onChange={(e) =>
          setNewFood({ ...newFood, category: e.target.value })
        }
      >
        {categories.map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <input
        placeholder="Image URL"
        value={newFood.img}
        onChange={(e) =>
          setNewFood({ ...newFood, img: e.target.value })
        }
      />

      <button onClick={addFood}>Add Food</button>

      {/* FOOD LIST */}
      <h3>Menu Items</h3>
      {foods.map(f => (
        <div key={f.id}>
          {f.name} - ₹{f.price} ({f.category})
        </div>
      ))}

      {/* ORDERS */}
      <h3 style={{ marginTop: "30px" }}>📦 Orders</h3>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div key={order.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>

          <p><b>Order ID:</b> {order.id}</p>

          <p><b>Items:</b> {
            order.items.map(i => i.name).join(", ")
          }</p>

          <p><b>Status:</b> {order.status}</p>

          {/* ACTION BUTTONS */}
          {order.status === "Preparing" && (
            <button onClick={() => acceptOrder(order.id)}>
              Accept Order
            </button>
          )}

          {order.status === "Accepted" && (
            <button onClick={() => markReady(order.id)}>
              Mark Ready
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default RestaurantDashboard;
