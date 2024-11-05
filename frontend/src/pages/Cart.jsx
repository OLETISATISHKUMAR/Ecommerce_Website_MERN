// src/pages/Cart.jsx
import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded p-4 mb-4">
            <h2>{item.name}</h2>
            <p>${item.price}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
