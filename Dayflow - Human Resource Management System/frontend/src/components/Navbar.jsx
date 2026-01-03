import React, { useState, useEffect, useRef } from 'react';
import { Menu, Bell, Sun, Moon, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ toggleSidebar, title }) => {
    const { isDark, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef(null);

    // Mock Notifications
    const notifications = [
        { id: 1, type: 'success', text: 'Leave request approved', time: '2 mins ago' },
        { id: 2, type: 'info', text: 'New payroll policy update', time: '1 hour ago' },
        { id: 3, type: 'alert', text: 'Complete your profile details', time: '1 day ago' },
        { id: 4, type: 'success', text: 'Salary credited for August', time: '2 days ago' },
    ];

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-20 h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 md:px-8 transition-colors duration-300">
            <div className="flex items-center gap-4">
                {/* Hamburger for Mobile */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>

                {/* Page Title */}
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {title}
                </h2>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    title="Toggle Theme"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notification Bell */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 relative group focus:outline-none"
                    >
                        <Bell size={22} className={`transition-colors ${showNotifications ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`} />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-[-70px] md:right-0 mt-3 w-[85vw] md:w-80 max-w-[350px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50 origin-top-right">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto">
                                {notifications.length > 0 ? (
                                    <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                        {notifications.map((notif) => (
                                            <div key={notif.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-3 items-start group">
                                                <div className={`mt-0.5 shrink-0 ${notif.type === 'success' ? 'text-emerald-500' :
                                                        notif.type === 'alert' ? 'text-orange-500' : 'text-blue-500'
                                                    }`}>
                                                    {notif.type === 'success' ? <CheckCircle size={18} /> :
                                                        notif.type === 'alert' ? <AlertCircle size={18} /> : <Info size={18} />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                        {notif.text}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                                        <p>No new notifications</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                                <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Mark all as read
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Date Display (Hidden on mobile) */}
                <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-200">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
