import React from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ toggleSidebar, title }) => {
    const { isDark, toggleTheme } = useTheme();

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
                <div className="relative cursor-pointer group">
                    <Bell size={22} className="text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
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
