// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const existingCartItemIndex = cartItems.findIndex((item) => item.id === product.id);

        if (existingCartItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingCartItemIndex].quantity++;
            setCartItems(updatedCartItems);
        } else {
            const newCartItem = { ...product, quantity: 1 };
            setCartItems([...cartItems, newCartItem]);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
    };

    const updateQuantity = (productId, newQuantity) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.prixProduit * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};