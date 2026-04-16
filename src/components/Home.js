import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationComponent from "./LocationComponent";
import { useTheme } from "./ThemeContext";

// 🍽️ RESTAURANTS
const restaurants = [
  { id: 1, name: "Udupi Hotel" },
  { id: 2, name: "Spicy Hub" }
];

const foods = [
  { id: 1, name: "Dosa", price: 80, category: "Breakfast", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976" },
   { id: 2, name: "Idli", price: 40, category: "Breakfast", img: "https://images.unsplash.com/photo-1632104667384-06f58cb7ad44" }, 
   { id: 3, name: "Vada", price: 40, category: "Breakfast", img: "https://images.unsplash.com/photo-1730191843435-073792ba22bc" }, 
   { id: 4, name: "Meals", price: 150, category: "Lunch", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" }, 
   { id: 5, name: "Fried Rice", price: 150, category: "Lunch", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19" }, 
   { id: 6, name: "Biryani", price: 180, category: "Lunch", img: "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da" },
    { id: 7, name: "Rotti Combo", price: 30, category: "Dinner", img: "https://t3.ftcdn.net/jpg/04/02/96/42/240_F_402964232.jpg" }, 
    { id: 8, name: "Butter Chicken", price: 100, category: "Dinner", img: "https://images.unsplash.com/photo-1772730064970-a7b2735c93b9" }, 
    { id: 9, name: "Noodles", price: 70, category: "Dinner", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246" }, 
    { id: 10, name: "Pizza", price: 150, category: "Snacks", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3" }, 
    { id: 11, name: "Sandwich", price: 50, category: "Snacks", img: "https://images.unsplash.com/photo-1619096252214-ef06c45683e3" },
     { id: 12, name: "Burger", price: 60, category: "Snacks", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" }, 
     { id: 13, name: "Oreo chocolate", price: 80, category: "Juice", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699" }, 
     { id: 14, name: "Mango", price: 60, category: "Juice", img: "https://images.unsplash.com/photo-1697642452436-9c40773cbcbb" },
      { id: 15, name: "Pomegranate", price: 60, category: "Juice", img: "https://images.unsplash.com/photo-1665834263149-b57fc4de3fa8" }, 
      { id: 16, name: "Ice Cream", price: 30, category: "Desserts", img: "https://images.unsplash.com/photo-1570197788417-0e82375c9371" }, 
      { id: 17, name: "Cake", price: 100, category: "Desserts", img: "https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0" }, 
      { id: 18, name: "Gulab jamun", price: 50, category: "Desserts", img: "https://media.istockphoto.com/id/163064596/photo/gulab-jamun.webp" },
       { id: 19, name: "Coffee", price: 20, category: "Beverages", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" }, 
       { id: 20, name: "Tea", price: 15, category: "Beverages", img: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03" }, 
    { id: 21, name: "Mango Lassi", price: 80, category: "Beverages", img: "https://images.unsplash.com/photo-1719239948819-0afeced16184" } ];

function Home({ cart, setCart, setUserLocation }) {
  const navigate = useNavigate();
  const { dark } = useTheme();

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const categories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Beverages"];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      style={{
       background: dark
  ? "linear-gradient(135deg, #1e1e2f, #121212)"
  : "linear-gradient(135deg, #fff3e0, #ffe0b2)",

        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h2>🍔 Cravory</h2>

      {/* LOCATION */}
      <LocationComponent setUserLocation={setUserLocation} />

      {/* RESTAURANTS */}
      <h3>Select Restaurant</h3>
      {restaurants.map((r) => (
        <button
          key={r.id}
          onClick={() => setSelectedRestaurant(r)}
          style={{
            margin: "5px",
            padding: "8px",
            background:
              selectedRestaurant?.id === r.id
                ? "#ff6b00"
                : dark
                ? "#333"
                : "#ddd",
            color: dark ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px"
          }}
        >
          {r.name}
        </button>
      ))}

      {/* FOOD */}
      {selectedRestaurant &&
        categories.map((cat) => (
          <div key={cat}>
            <h3>{cat}</h3>

            {/* ✅ GRID FIX */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px"
              }}
            >
              {foods
                .filter((item) => item.category === cat)
                .map((item) => (
                  <div
                    key={item.id}
                    style={{
                      width: "180px",
                      background: "#fff",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      transition: "0.3s",
                      cursor: "pointer"
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover"
                      }}
                    />

                    <div style={{ padding: "10px" }}>
                      <h4>{item.name}</h4>
                      <p>₹{item.price}</p>

                      <button onClick={() => addToCart(item)}>
                        Add
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

      {/* CART */}
      <div style={{ marginTop: "30px" }}>
        <h3>🛒 Cart</h3>

        {cart.length === 0 && <p>No items</p>}

        {cart.map((item, i) => (
          <div key={i}>
            {item.name} - ₹{item.price}
            <button onClick={() => removeFromCart(i)}>❌</button>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>

        <button onClick={() => navigate("/payment")}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Home;