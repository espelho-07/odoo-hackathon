import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

/**
 * Navbar Component
 * 
 * Purpose:
 * Top navigation bar that persists across authenticated pages.
 * Displays the current page title (contextual), and user profile/notifications.
 * 
 * Props:
 * - toggleSidebar: Function to toggle the mobile sidebar.
 * - title: The current page title to display.
 * 
 * Why reusable:
 * Can be dropped into any layout wrapper.
 */
const Navbar = ({ toggleSidebar, title = "Dayflow" }) => {
    return (
        <nav className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-4 md:px-6 z-20 sticky top-0">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 md:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>

                {/* Page Title / Brand */}
                <h1 className="text-xl font-bold text-white tracking-wide">
                    <span className="text-indigo-500">Day</span>flow
                    {title && <span className="text-slate-500 font-normal mx-2">/ {title}</span>}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium text-white">Alex Morgan</p>
                        <p className="text-xs text-slate-400">Employee</p>
                    </div>
                    <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white border border-indigo-400 shadow-md">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
