"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartButton = ({ className = '' }) => {
    const { getTotalItems, openCart, cartItems } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);
    const itemCount = getTotalItems();

    useEffect(() => {
        if (cartItems.length > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 600);
            return () => clearTimeout(timer);
        }
    }, [cartItems]);

    return (
        <button
            onClick={openCart}
            className={`relative p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 ${isAnimating ? 'animate-pulse scale-110' : ''
                } ${className}`}
        >
            <FaShoppingCart size={24} />
            {itemCount > 0 && (
                <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold transition-all duration-300 ${isAnimating ? 'scale-125 animate-bounce' : ''
                    }`}>
                    {itemCount > 99 ? '99+' : itemCount}
                </span>
            )}
        </button>
    );
};

export default CartButton;
