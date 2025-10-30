import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setCount((c) => c + 1);
    setTotal((t) => t + product.price);
  };

  const removeFromCart = (index) => {
    setCart((prev) => {
      const updated = [...prev];
      const removed = updated.splice(index, 1)[0];
      if (removed) {
        setCount((c) => c - 1);
        setTotal((t) => t - removed.price);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCount(0);
    setTotal(0);
  };

  return (
    <CartContext.Provider value={{ cart, count, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
