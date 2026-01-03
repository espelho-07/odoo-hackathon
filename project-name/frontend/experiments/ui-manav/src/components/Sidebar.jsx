import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Users,
    Calendar,
    Clock,
    CreditCard,
    Settings,
    LogOut,
    LayoutDashboard
} from 'lucide-react';

/**
 * Sidebar Component
 * 
 * Purpose:
 * Main navigation menu for the specific authenticated routes.
 * 
 * Props:
 * - isOpen: Boolean state for mobile visibility.
 * - closeSidebar: Function to close the sidebar on mobile selection.
 * 
 * Why reusable:
 * Configurable menu items array makes it easy to add/remove routes.
 */
const Sidebar = ({ isOpen, closeSidebar }) => {

    // Navigation Items Config
    const menuItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'My Profile', path: '/profile', icon: Users },
        { label: 'Attendance', path: '/attendance', icon: Clock },
        { label: 'Leave Requests', path: '/leave', icon: Calendar },
        { label: 'Payroll', path: '/payroll', icon: CreditCard },
    ];

    const adminItems = [
        { label: 'Admin Panel', path: '/admin', icon: Settings },
    ];

    // Helper for Link Styles
    const linkClasses = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
    ${isActive
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        }
  `;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
          fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-slate-900 border-r border-slate-700 
          transform transition-transform duration-300 z-30 overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                <div className="p-4 space-y-6">
                    {/* Main Menu */}
                    <div>
                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Menu
                        </p>
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeSidebar}
                                    className={linkClasses}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Admin Section (Dummy Logic) */}
                    <div>
                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Management
                        </p>
                        <div className="space-y-1">
                            {adminItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeSidebar}
                                    className={linkClasses}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer / Logout */}
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-700 bg-slate-900">
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-medium"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </NavLink>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
