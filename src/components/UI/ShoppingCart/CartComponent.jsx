"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import { FaTimes, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const CartComponent = ({ className = '' }) => {
    const {
        cartItems,
        isCartOpen,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        closeCart,
        openCart
    } = useCart();

    const [isAnimating, setIsAnimating] = useState(false);
    const itemCount = getTotalItems();

    useEffect(() => {
        if (cartItems.length > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 600);
            return () => clearTimeout(timer);
        }
    }, [cartItems]);

    const formatPrice = (price) => {
        return (price / 100).toFixed(2);
    };

    const handleCheckout = () => {
        alert('Checkout functionality would go here');
        // You can replace this with your checkout logic
    };

    return (
        <>
            {/* Cart Button */}
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

            {/* Shopping Cart Sidebar */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-md"
                        onClick={closeCart}
                    />
                    <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-2xl">
                        <div className="flex h-full flex-col bg-gradient-to-b from-white/20 to-white/5">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-white/20 backdrop-blur-sm px-4 py-3 bg-white/10">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2 drop-shadow-lg">
                                    <FaShoppingCart className="text-blue-300" />
                                    Shopping Cart
                                </h2>
                                <button
                                    onClick={closeCart}
                                    className="rounded-full p-2 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto px-4 py-4">
                                {cartItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-white/70">
                                        <FaShoppingCart size={48} className="mb-4 text-white/30 drop-shadow-lg" />
                                        <p className="text-lg font-medium text-white drop-shadow-lg">Your cart is empty</p>
                                        <p className="text-sm text-white/80 drop-shadow-lg">Add some products to get started</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300"
                                            >
                                                {item.image && (
                                                    <div className="flex-shrink-0">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={60}
                                                            height={60}
                                                            className="rounded-xl object-cover shadow-lg border border-white/20"
                                                            unoptimized
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-medium text-white truncate drop-shadow-lg">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-green-300 font-semibold drop-shadow-lg">
                                                        ${formatPrice(item.price)}
                                                    </p>
                                                    <p className="text-xs text-white/60 drop-shadow-lg">
                                                        Stock: {item.stockLevel}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-center space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <FaMinus size={10} className="text-white" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-medium text-white drop-shadow-lg">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20"
                                                            disabled={item.quantity >= item.stockLevel}
                                                        >
                                                            <FaPlus size={10} className="text-white" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-xs text-red-500 hover:text-red-200 transition-colors drop-shadow-lg font-semibold"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer with totals and actions */}
                            {cartItems.length > 0 && (
                                <div className="border-t border-white/20 backdrop-blur-sm px-4 py-4 space-y-4 bg-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-white drop-shadow-lg">Subtotal:</span>
                                        <span className="text-lg font-bold text-blue-700 drop-shadow-lg">
                                            ${formatPrice(getTotalPrice())}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <button
                                            className="w-full bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-600/90 hover:to-blue-700/90 text-white py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105"
                                            onClick={handleCheckout}
                                        >
                                            Checkout ({getTotalItems()} items)
                                        </button>

                                        <button
                                            className="w-full text-white/80 hover:text-white py-2 rounded-xl border border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                            onClick={clearCart}
                                        >
                                            Clear Cart
                                        </button>

                                        <button
                                            className="w-full text-blue-600 hover:text-blue-200 py-2 rounded-xl transition-colors backdrop-blur-sm"
                                            onClick={closeCart}
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartComponent;
