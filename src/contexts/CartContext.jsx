"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from '@/components/UI/Toast/Toast';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch (error) {
                    console.error('Error loading cart from localStorage:', error);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = (product, variant = null, quantity = 1) => {
        const getStockLevel = (variantData) => {
            if (variantData?.stockLevel === "IN_STOCK" || variantData?.stockLevel === "LOW_STOCK") {
                return 100;
            }
            if (variantData?.stockLevel === "OUT_OF_STOCK") {
                return 0;
            }
            if (typeof variantData?.stockLevel === 'number' && variantData.stockLevel > 0) {
                return variantData.stockLevel;
            }
            if (variantData?.stockLevels && variantData.stockLevels.length > 0) {
                return variantData.stockLevels[0].stockOnHand || 0;
            }
            return 0;
        };

        const stockLevel = variant ? getStockLevel(variant) : getStockLevel(product.variants?.[0]);

        const cartItem = {
            id: variant ? `${product.id}-${variant.id}` : product.id,
            productId: product.id,
            variantId: variant?.id,
            name: variant ? variant.name : product.name,
            price: variant ? variant.price : (product.variants?.[0]?.price || 0),
            image: variant?.assets?.[0]?.preview || product.assets?.[0]?.preview || product.variants?.[0]?.assets?.[0]?.preview,
            stockLevel: stockLevel,
            quantity
        };

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === cartItem.id);

            if (existingItem) {
                const updatedItems = prevItems.map(item =>
                    item.id === cartItem.id
                        ? { ...item, quantity: Math.min(item.quantity + quantity, item.stockLevel) }
                        : item
                );
                return updatedItems;
            }

            const newItems = [...prevItems, cartItem];
            return newItems;
        });

        showToast(`${variant ? variant.name : product.name} added to cart!`, 'success');
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.min(newQuantity, item.stockLevel) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
    };

    const hideToast = () => {
        setToast(prev => ({ ...prev, isVisible: false }));
    };

    const value = {
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        openCart,
        closeCart,
        toast,
        showToast,
        hideToast
    };

    return (
        <CartContext.Provider value={value}>
            {children}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
            />
        </CartContext.Provider>
    );
};