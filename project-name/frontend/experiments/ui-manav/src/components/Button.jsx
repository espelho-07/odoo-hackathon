import React from 'react';

/**
 * Button Component
 * 
 * Purpose:
 * Provides a standardized button interaction element across the application.
 * 
 * Props:
 * - children: The content to display inside the button (text or elements).
 * - onClick: Function to call when clicked.
 * - variant: 'primary' | 'secondary' | 'danger' - Determines the styling.
 * - type: HTML button type (submit, button, reset).
 * - className: Additional classes for custom styling overrides.
 * 
 * Why reusable:
 * Using a centralized button ensures consistent padding, border-radius, and hover effects throughout the app.
 */
const Button = ({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    className = ''
}) => {

    // Define base styles common to all buttons
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";

    // Define variant-specific styles
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-lg shadow-indigo-500/20",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500 border border-slate-600",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-lg shadow-red-500/20",
        ghost: "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
