import React from 'react';

const Card = ({ children, title, className = '', style = {} }) => {
    return (
        <div
            className={`
            bg-white/70 dark:bg-slate-900/50 
            backdrop-blur-sm 
            border border-slate-200 dark:border-slate-800 
            rounded-2xl 
            p-6 
            shadow-xl shadow-slate-200/50 dark:shadow-black/20
            hover:border-indigo-500/20 dark:hover:border-slate-700/50 transition-colors
            ${className}
        `}
            style={style}
        >
            {/* Optional Title Header */}
            {title && (
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white tracking-wide">{title}</h3>
                </div>
            )}

            {/* Card Content */}
            <div className="text-slate-600 dark:text-slate-300">
                {children}
            </div>
        </div>
    );
};

export default Card;
