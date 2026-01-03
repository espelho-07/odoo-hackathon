import React from 'react';
import { Plane, Circle } from 'lucide-react';

export default function StatusBadge({ status }) {
    // Logic from Wireframe:
    // Green Dot = Active/Present
    // Plane Icon = On Leave
    // Yellow Dot = Absent/Inactive

    if (status === 'Active' || status === 'Present') {
        return (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                <Circle size={10} fill="currentColor" />
                <span className="text-xs font-bold text-green-700">{status}</span>
            </div>
        );
    }

    if (status === 'On Leave') {
        return (
            <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                <Plane size={12} fill="currentColor" />
                <span className="text-xs font-bold text-blue-700">{status}</span>
            </div>
        );
    }

    if (status === 'Absent' || status === 'Rejected') {
        return (
            <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                <Circle size={10} fill="currentColor" />
                <span className="text-xs font-bold text-yellow-700">{status}</span>
            </div>
        );
    }

    if (status === 'Approved') {
        return (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                <Circle size={10} fill="currentColor" />
                <span className="text-xs font-bold text-green-700">{status}</span>
            </div>
        );
    }

    // Default
    return (
        <span className="px-2 py-1 rounded text-xs font-bold bg-gray-100 text-gray-800">
            {status}
        </span>
    );
}
