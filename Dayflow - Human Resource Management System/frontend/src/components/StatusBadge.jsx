import React from 'react';

/**
 * StatusBadge Component
 * Displays a status string with appropriate color coding.
 * 
 * @param {Object} props
 * @param {string} props.status - Status text (Active, On Leave, etc.)
 */
export default function StatusBadge({ status }) {
    // Determine color based on status text
    const getStyles = () => {
        if (!status) return 'bg-slate-100 text-slate-700 border-slate-200';

        switch (status.toLowerCase()) {
            case 'active':
            case 'present':
            case 'approved':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'on leave':
            case 'rejected':
            case 'absent':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'pending':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles()}`}>
            {status || 'Unknown'}
        </span>
    );
}
