import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Users,
    Calendar,
    Clock,
    CreditCard,
    Settings,
    LogOut,
    LayoutDashboard,
    UserPlus,
    Briefcase
} from 'lucide-react';
import { getCurrentUser, logoutUser } from '../utils/storage';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const user = getCurrentUser();
    const isAdmin = user?.role === 'admin';

    const links = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'My Profile', path: '/profile', icon: Users },
    ];

    if (!isAdmin) {
        links.push(
            { label: 'Attendance', path: '/attendance', icon: Clock },
            { label: 'Time Off', path: '/timeoff', icon: Calendar },
            { label: 'My Payroll', path: '/payroll', icon: CreditCard }
        );
    }

    if (isAdmin) {
        links.push(
            { label: 'Employees', path: '/employees', icon: Users },
            { label: 'Attendance Logs', path: '/attendance', icon: Clock },
            { label: 'Leave Requests', path: '/timeoff', icon: Calendar },
            { label: 'Payroll Manager', path: '/payroll', icon: CreditCard }
        );
    }

    // Dynamic Class for Links
    const linkClasses = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
    ${isActive
            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/20'
            : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
        }
  `;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`
          fixed md:sticky top-0 left-0 h-screen w-72 
          bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 
          transition-transform duration-300 z-30 flex flex-col shadow-2xl md:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                {/* Brand Header */}
                <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/30">
                        <Briefcase className="text-white" size={20} />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                        Dayflow
                    </h1>
                </div>

                {/* User Info Snippet */}
                <div className="p-6 pb-2">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                            {user?.avatar || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-slate-900 dark:text-white font-semibold text-sm truncate">{user?.name}</p>
                            <p className="text-indigo-600 dark:text-indigo-400 text-xs font-medium uppercase tracking-wide">{user?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 overflow-y-auto px-4 space-y-1 py-4">
                    <p className="px-4 text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-3">
                        Main Menu
                    </p>
                    {links.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
                            className={linkClasses}
                        >
                            <item.icon size={20} className="transition-transform group-hover:scale-110" />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Logout Footer */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <NavLink
                        to="/"
                        onClick={logoutUser}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-medium group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </NavLink>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
