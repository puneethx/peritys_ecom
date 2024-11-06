// app/context/CartContext.js
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [apiCart, setApiCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from API
  useEffect(() => {
    const fetchApiCart = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://fakestoreapi.com/carts');
        const cartsData = await res.json();
        
        // Fetch product details for each item in carts
        const productPromises = cartsData.flatMap(cart => 
          cart.products.map(async product => {
            const productRes = await fetch(`https://fakestoreapi.com/products/${product.productId}`);
            const productData = await productRes.json();
            return {
              ...productData,
              quantity: product.quantity,
              cartId: cart.id,
              userId: cart.userId
            };
          })
        );

        const productsWithDetails = await Promise.all(productPromises);
        setApiCart(productsWithDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApiCart();
  }, []);

  // Calculate total for both local and API cart items
  useEffect(() => {
    const localTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const apiTotal = apiCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(localTotal + apiTotal);
  }, [cart, apiCart]);

  const addToCart = async (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Send to API
    try {
      const response = await fetch('https://fakestoreapi.com/carts', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 5,
          date: new Date().toISOString(),
          products: [{
            productId: product.id,
            quantity: 1
          }]
        })
      });
      const data = await response.json();
      console.log('Cart updated:', data);
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  const removeFromCart = async (productId, isApiCart = false) => {
    if (isApiCart) {
      try {
        await fetch(`https://fakestoreapi.com/carts/${productId}`, {
          method: 'DELETE'
        });
        setApiCart(prevCart => prevCart.filter(item => item.id !== productId));
      } catch (err) {
        console.error('Error removing item from API cart:', err);
      }
    } else {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }
  };

  const updateQuantity = async (productId, newQuantity, isApiCart = false) => {
    if (newQuantity < 1) return;
    
    if (isApiCart) {
      try {
        await fetch(`https://fakestoreapi.com/carts/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 5,
            date: new Date().toISOString(),
            products: [{
              productId: productId,
              quantity: newQuantity
            }]
          })
        });
        setApiCart(prevCart =>
          prevCart.map(item =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      } catch (err) {
        console.error('Error updating API cart quantity:', err);
      }
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      apiCart, 
      cartTotal, 
      loading, 
      error,
      addToCart, 
      removeFromCart, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  }