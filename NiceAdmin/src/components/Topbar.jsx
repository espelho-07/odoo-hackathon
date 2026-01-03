import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Topbar = ({ toggleSidebar, isSidebarOpen }) => {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-20 px-6 flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors lg:hidden"
                >
                    <FiMenu size={24} />
                </button>

                {/* Search Bar */}
                <div className="hidden md:flex items-center px-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-100 focus-within:bg-white transition-all w-64 lg:w-96">
                    <FiSearch className="text-slate-400 mr-3" size={18} />
                    <input
                        type="text"
                        placeholder="Search employees, leaves..."
                        className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                >
                    <FiBell size={22} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </motion.button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800">{user?.name || 'Guest'}</p>
                        <p className="text-xs text-slate-500 font-medium capitalize">{user?.role || 'Visitor'}</p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-lg shadow-slate-200"
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
