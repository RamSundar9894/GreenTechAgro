import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product, quantity) => {
    try {
      const total = product.price * quantity;
      const cartItem = { product, quantity, total };
      await axios.post('http://localhost:8080/cart', cartItem);
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${cartItemId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
