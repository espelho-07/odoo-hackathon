import React from 'react';
import { User, LogOut } from 'lucide-react';

/**
 * Navbar Component
 * Displays the brand logo and the current user's profile/logout.
 * 
 * @param {Object} props
 * @param {string} props.userRole - Current user role (Admin/Employee)
 * @param {Function} props.onLogout - Function to handle logout
 */
export default function Navbar({ userRole, onLogout }) {
    return (
        <nav className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
            {/* Brand Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-xl font-bold text-slate-800 tracking-tight">Dayflow</span>
            </div>

            {/* Right Side: User Profile & Actions */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                        <User size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700">Demo User</span>
                        <span className="text-xs text-slate-500 uppercase font-semibold">{userRole}</span>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </nav>
    );
}
