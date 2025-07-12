"use client";
import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, duration]);

    if (!isVisible) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            case 'info':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-green-500 text-white';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheck size={16} />;
            case 'error':
                return <FaTimes size={16} />;
            default:
                return <FaCheck size={16} />;
        }
    };

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-in">
            <div className={`${getTypeStyles()} px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
                {getIcon()}
                <span className="font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-auto hover:opacity-70 transition-opacity"
                >
                    <FaTimes size={14} />
                </button>
            </div>
        </div>
    );
};

export default Toast;
