import { FiMenu, FiBell, FiMoon, FiSun } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Topbar = ({ toggleSidebar, isSidebarOpen }) => {
    const { user, darkMode, toggleTheme } = useAuth();

    return (
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800 sticky top-0 z-20 px-6 flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors lg:hidden"
                >
                    <FiMenu size={24} />
                </button>

                {/* Branding */}
                <div className="hidden md:flex items-center gap-3">
                    <div className="bg-indigo-600 dark:bg-indigo-500 text-white p-1.5 rounded-lg">
                        <span className="font-bold text-lg">DF</span>
                    </div>
                    <h1 className="text-xl font-bold font-display text-slate-800 dark:text-white tracking-tight">
                        Dayflow
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-colors"
                >
                    {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors"
                >
                    <FiBell size={22} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                </motion.button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.name || 'Guest'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium capitalize">{user?.role || 'Visitor'}</p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-lg shadow-slate-200 dark:shadow-none"
                    >
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
