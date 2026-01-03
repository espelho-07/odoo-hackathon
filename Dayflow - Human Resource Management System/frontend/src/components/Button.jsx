import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    className = ''
}) => {

    const baseStyles = "px-6 py-2.5 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 border border-transparent",
        secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-sm",
        danger: "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20",
        ghost: "bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-white"
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
