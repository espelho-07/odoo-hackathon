import { useState } from 'react';
import { FiClock, FiCalendar, FiCheckCircle, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { motion } from 'framer-motion';

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const [clockedIn, setClockedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAttendance = () => {
        setLoading(true);
        setTimeout(() => {
            setClockedIn(!clockedIn);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
            >
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl text-white font-bold shadow-lg shadow-indigo-200">
                        {user?.name?.charAt(0) || 'E'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Good Morning, {user?.name?.split(' ')[0] || 'Employee'}!</h2>
                        <p className="text-slate-500">Ready to conquer the day?</p>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                    <div className="text-right hidden sm:block">
                        <p className="text-2xl font-bold text-slate-800 tabular-nums">{new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</p>
                        <p className="text-sm text-slate-500 font-medium">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
                 
                 {/* Clock In/Out Button (Prominent) */}
                 <div className="w-full md:w-auto">
                     <Button 
                        size="lg"
                        variant={clockedIn ? "danger" : "primary"}
                        onClick={handleAttendance}
                        loading={loading}
                        className={clockedIn ? "w-full md:w-40 shadow-red-200" : "w-full md:w-40 shadow-indigo-300"}
                    >
                        {clockedIn ? 'Clock Out' : 'Clock In'}
                    </Button>
                 </div>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                     { title: "Today's Hours", val: "04:30 hrs", icon: FiClock, color: "text-blue-600", bg: "bg-blue-50" },
                     { title: "Attendance", val: "92%", icon: FiCheckCircle, color: "text-green-600", bg: "bg-green-50" },
                     { title: "Leave Balance", val: "12 Days", icon: FiCalendar, color: "text-purple-600", bg: "bg-purple-50" },
                     { title: "Notifications", val: "1 New", icon: FiAlertCircle, color: "text-orange-600", bg: "bg-orange-50" },
                 ].map((stat, idx) => (
                     <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                     >
                        <Card className="hover:shadow-md transition-all cursor-default">
                            <div className="flex items-center gap-4">
                                <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                                    <h3 className="text-xl font-bold text-slate-800">{stat.val}</h3>
                                </div>
                            </div>
                        </Card>
                     </motion.div>
                 ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Attendance History">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-l-lg">Date</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Check In</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider rounded-r-lg">Check Out</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[1, 2, 3, 4].map((i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-4 py-3.5 text-slate-700 font-medium">Oct {10+i}, 2023</td>
                                            <td className="px-4 py-3.5"><Badge variant="success">Present</Badge></td>
                                            <td className="px-4 py-3.5 text-slate-500">09:00 AM</td>
                                            <td className="px-4 py-3.5 text-slate-500">06:00 PM</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="pt-4 mt-2 border-t border-slate-50 flex justify-end">
                             <Button variant="ghost" size="sm" className="text-indigo-600">View Full History <FiArrowRight /></Button>
                        </div>
                    </Card>
                </div>
                
                {/* Profile Summary */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center shadow-xl relative overflow-hidden">
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="p-1 bg-white/10 rounded-full mb-4 backdrop-blur-sm border border-white/20">
                                <img 
                                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                                    alt="User" 
                                    className="w-20 h-20 rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-bold">{user?.name}</h3>
                            <p className="text-slate-400 text-sm mb-6">Senior UI Designer • EMP-042</p>
                            
                            <div className="w-full grid grid-cols-2 gap-3">
                                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                    <p className="text-xs text-slate-400 mb-1">Joined</p>
                                    <p className="font-semibold text-sm">Jan 2023</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                                    <p className="text-xs text-slate-400 mb-1">Dept</p>
                                    <p className="font-semibold text-sm">Design</p>
                                </div>
                            </div>
                        </div>
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500 rounded-full filter blur-[60px] opacity-20"></div>
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500 rounded-full filter blur-[60px] opacity-20"></div>
                    </div>
                    
                    <Card title="Quick Actions" noPadding>
                         <div className="divide-y divide-slate-100">
                             {['Apply for Leave', 'Download Payslip', 'Update Profile'].map((action, i) => (
                                 <button key={i} className="w-full text-left p-4 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 flex justify-between group">
                                     {action}
                                     <FiArrowRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                 </button>
                             ))}
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
