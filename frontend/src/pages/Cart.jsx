import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to fetch cart items with populated product details
  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found! Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setLoading(false);
        if (response.status === 401) {
          setError("Unauthorized access. Please log in again.");
        } else {
          setError(`Failed to fetch cart items: ${response.statusText}`);
        }
        return;
      }

      const data = await response.json();
      console.log("Fetched cart items:", data); // Log the full response to verify its structure

      // Since the API returns an array of items, directly set it
      if (Array.isArray(data)) {
        setCartItems(data);
        setError(""); // Clear any previous error
      } else {
        setError("Invalid cart data structure: Expected an array of items.");
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setError("Failed to fetch cart items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Update item quantity in the cart
  const updateCartItemQuantity = async (itemId, quantity) => {
    const token = localStorage.getItem("token");

    if (quantity < 1) return; // Prevent quantity from being less than 1

    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/update/${itemId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        }
      );

      if (response.ok) {
        const updatedCart = await response.json();
        setCartItems(updatedCart.cart.items); // Update frontend state with new cart items
      } else {
        const errorData = await response.json();
        setError(`Error updating cart: ${errorData.message}`);
      }
    } catch (error) {
      setError("Error updating cart. Please try again later.");
    }
  };

  // Remove item from the cart
  const removeCartItem = async (itemId) => {
    const token = localStorage.getItem("token");
  
    if (!itemId) {
      setError("Item ID is missing.");
      return;
    }
  
    console.log("Removing item with ID:", itemId);  // Log the itemId being passed
    console.log("Current cart items:", cartItems);  // Log current cart items to check if the item exists
  
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/remove/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const updatedCart = await response.json();
        console.log("Updated cart:", updatedCart);  // Log the response from the server
  
        if (updatedCart && updatedCart.cart && Array.isArray(updatedCart.cart)) {
          setCartItems(updatedCart.cart);
        } else {
          setError("Error: Invalid cart data structure after removal.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error removing item.");
      }
    } catch (error) {
      setError("Error removing item from cart. Please try again later.");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {loading ? (
        <p>Loading cart items...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : cartItems.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-3">Cart Items</h2>
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="bg-gray-100 p-3 rounded-md shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium">{item.product.name}</p>
                  <p>Price: ${item.product.price.toFixed(2)}</p>
                  <p>
                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-red-500 text-white rounded disabled:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item._id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeCartItem(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate("/billing")}
            className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default Cart;
