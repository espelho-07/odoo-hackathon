import React from 'react';

/**
 * Card Component
 * 
 * Purpose:
 * A container meant to group related content, providing a distinct background and shadow.
 * 
 * Props:
 * - children: Content to act as the body of the card.
 * - title: Optional header text for the card.
 * - className: Allow custom styles to be merged.
 * 
 * Why reusable:
 * Provides the standard "panel" look for the dashboard widgets and sections.
 */
const Card = ({ children, title, className = '' }) => {
    return (
        <div className={`bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl ${className}`}>
            {/* Optional Title Header */}
            {title && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>
            )}

            {/* Card Content */}
            <div className="text-slate-300">
                {children}
            </div>
        </div>
    );
};

export default Card;
