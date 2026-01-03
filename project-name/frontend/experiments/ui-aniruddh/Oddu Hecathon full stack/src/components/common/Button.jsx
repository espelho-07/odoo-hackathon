import { FiLoader } from 'react-icons/fi';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className, 
    loading = false, 
    disabled, 
    type = 'button',
    onClick,
    ...props 
}) => {
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
        danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-lg",
        md: "px-5 py-2.5 text-sm rounded-xl",
        lg: "px-8 py-3.5 text-base rounded-xl"
    };

    return (
        <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            className={clsx(
                "font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed",
                variants[variant],
                sizes[size],
                className
            )}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <FiLoader className="animate-spin" />}
            {children}
        </motion.button>
    );
};

export default Button;
