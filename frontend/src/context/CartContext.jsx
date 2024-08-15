import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.product_name === product.product_name);
      if (existingProduct) {
        return prevItems.map((item) =>
          item.product_name === product.product_name
            ? { ...item, quantity: item.quantity + product.quantity, totalPrice: item.totalPrice + product.totalPrice }
            : item
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
