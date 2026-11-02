
import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Save cart in localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    if (Number(product.stock) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Out of Stock",
        text: "This product is currently unavailable.",
        confirmButtonColor: "#3d6b4f",
      });
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= Number(product.stock)) {
        Swal.fire({
          icon: "warning",
          title: "Stock Limit Reached",
          text: "You cannot add more than the available stock.",
          confirmButtonColor: "#3d6b4f",
        });
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      Swal.fire({
        icon: "info",
        title: "Quantity Updated",
        text: `${product.name} quantity increased.`,
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { ...product, quantity: 1 },
      ]);

      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${product.name} has been added to your cart.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );

    Swal.fire({
      icon: "success",
      title: "Removed!",
      text: "Item has been removed from your cart.",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // Increase product quantity
  const increaseQty = (id) => {
    const item = cart.find((product) => product.id === id);

    if (!item || item.quantity >= Number(item.stock)) {
      Swal.fire({
        icon: "warning",
        title: "Stock Limit Reached",
        text: "No more stock is available for this product.",
        confirmButtonColor: "#3d6b4f",
      });
      return;
    }

    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Decrease product quantity
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);

    Swal.fire({
      icon: "success",
      title: "Cart Cleared!",
      text: "Your shopping cart is now empty.",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // Calculate total cart quantity
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total cart price
  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
