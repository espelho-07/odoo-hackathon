import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  FiHome, FiUsers, FiClipboard, FiCalendar, FiDollarSign, 
  FiPieChart, FiSettings, FiLogOut, FiX 
} from 'react-icons/fi';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useApp();
  const location = useLocation();

  const role = user?.role || 'employee';

  const adminLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Employees', path: '/employees', icon: FiUsers },
    { name: 'Attendance', path: '/attendance', icon: FiClipboard },
    { name: 'Leave Requests', path: '/leaves', icon: FiCalendar },
    { name: 'Payroll', path: '/payroll', icon: FiDollarSign },
    { name: 'Reports', path: '/reports', icon: FiPieChart },
  ];

  const employeeLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Attendance', path: '/attendance', icon: FiClipboard },
    { name: 'Leaves', path: '/leaves', icon: FiCalendar },
    { name: 'Payslips', path: '/payroll', icon: FiDollarSign },
    { name: 'Reports', path: '/reports', icon: FiPieChart },
  ];

  const links = role === 'admin' ? adminLinks : employeeLinks;

  const sidebarVariants = {
    open: { width: "16rem", transition: { type: "spring", damping: 20 } },
    closed: { width: "5rem", transition: { type: "spring", damping: 20 } }
  };

  return (
    <>
        {/* Mobile Backdrop */}
        <AnimatePresence>
            {sidebarOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 lg:hidden"
                />
            )}
        </AnimatePresence>

        <motion.aside 
            variants={sidebarVariants}
            animate={sidebarOpen ? "open" : "closed"}
            initial={false}
            className={clsx(
                "fixed top-0 left-0 h-screen z-30 bg-slate-900 text-slate-300 shadow-2xl flex flex-col border-r border-slate-800/50",
                "lg:static lg:h-screen lg:shrink-0"
            )}
        >
            {/* Logo */}
            <div className={clsx("h-20 flex items-center px-6 border-b border-slate-800/50", sidebarOpen ? "justify-between" : "justify-center")}>
                {sidebarOpen ? (
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                            D
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Dayflow</span>
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-extrabold text-xl">
                        D
                    </div>
                )}
                 {/* Mobile Close */}
                 <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400">
                    <FiX size={24} />
                 </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive 
                                    ? "bg-indigo-600/10 text-white" 
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50",
                                !sidebarOpen && "justify-center"
                            )}
                        >
                            <link.icon size={22} className={clsx("transition-colors", isActive ? "text-indigo-400" : "group-hover:text-indigo-300")} />
                            {sidebarOpen && (
                                <motion.span 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-medium text-sm"
                                >
                                    {link.name}
                                </motion.span>
                            )}
                            {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]" />}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer / User */}
            <div className="p-4 border-t border-slate-800/50 bg-slate-900/50">
                <button 
                    onClick={logout}
                    className={clsx(
                        "flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200 group",
                        !sidebarOpen && "justify-center"
                    )}
                >
                    <FiLogOut size={22} className="group-hover:scale-110 transition-transform" />
                    {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
                </button>
                
                {sidebarOpen && (
                     <div className="mt-4 flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white border border-slate-600">
                             {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                            <p className="text-xs text-slate-500 capitalize">{role}</p>
                        </div>
                     </div>
                )}
            </div>
        </motion.aside>
    </>
  );
};

export default Sidebar;
