import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('journalCart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('journalCart', JSON.stringify(cart));
    }, [cart]);

    // Each item in cart: { ...journalData, subscriptionYear, subscriptionType, subscriptionIssue }
    const addToCart = (journal, options) => {
        const itemId = `${journal.id}-${options.subscriptionYear}-${options.subscriptionType}-${options.subscriptionIssue}`;
        if (!cart.find(item => item.cartItemId === itemId)) {
            setCart([...cart, { ...journal, ...options, cartItemId: itemId }]);
        }
    };

    const removeFromCart = (cartItemId) => {
        setCart(cart.filter(item => item.cartItemId !== cartItemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
