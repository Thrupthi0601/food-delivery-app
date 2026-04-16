import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Payment from "./components/Payment";
import Tracking from "./components/Tracking";
import RestaurantDashboard from "./components/RestaurantDashboard";
import Profile from "./components/Profile";
import Auth from "./components/Auth";
import Home from "./components/Home";
import { useTheme } from "./components/ThemeContext";

function App() {
  const { dark, toggleTheme } = useTheme();

  const [cart, setCart] = useState([]);
  const [userLocation, setUserLocation] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const clearCart = () => setCart([]);

  const isLoggedIn = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <button onClick={toggleTheme}>
        {dark ? "☀ Light" : "🌙 Dark"}
      </button>

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home cart={cart} setCart={setCart} setUserLocation={setUserLocation} />
            ) : (
              <Auth />
            )
          }
        />

        <Route
          path="/payment"
          element={
            <Payment
              cart={cart}
              total={total}
              userLocation={userLocation}
              clearCart={clearCart}
            />
          }
        />

        <Route path="/tracking/:id" element={<Tracking />} />
        <Route path="/restaurant" element={<RestaurantDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
