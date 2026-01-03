import { FiUsers, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const AdminDashboard = () => {
    // Mock Data
    const stats = [
        { title: 'Total Employees', value: '42', icon: FiUsers, color: 'bg-blue-500', trend: '+12%' },
        { title: 'On Time Today', value: '38', icon: FiCheckCircle, color: 'bg-emerald-500', trend: '98%' },
        { title: 'Late Arrivals', value: '4', icon: FiClock, color: 'bg-amber-500', trend: '-2%' },
        { title: 'Leave Requests', value: '2', icon: FiAlertCircle, color: 'bg-red-500', trend: 'Pending' },
    ];

    const chartData = [
        { name: 'Mon', attendance: 38, late: 2 },
        { name: 'Tue', attendance: 40, late: 1 },
        { name: 'Wed', attendance: 35, late: 5 },
        { name: 'Thu', attendance: 39, late: 2 },
        { name: 'Fri', attendance: 41, late: 0 },
    ];

    const pendingLeaves = [
        { id: 1, employee: 'Sarah Connor', type: 'Sick Leave', date: 'Oct 24, 2023', status: 'Pending' },
        { id: 2, employee: 'John Wick', type: 'Casual Leave', date: 'Oct 25, 2023', status: 'Pending' },
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary">Download Report</Button>
                    <Button>+ Add Employee</Button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                    >
                        <Card className="hover:!shadow-lg hover:-translate-y-1 transition-all duration-300 !border-l-0 relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                <stat.icon size={80} className={stat.color.replace('bg-', 'text-')} />
                            </div>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 text-${stat.color.replace('bg-', '')}`}>
                                    <stat.icon size={24} className={stat.color.replace('bg-', 'text-')} />
                                </div>
                                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{stat.trend}</span>
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                                <h3 className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                    <Card title="Attendance Trends" className="h-full">
                        <div className="h-80 w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                        cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                                    />
                                    <Area type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAttendance)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Side Content */}
                <div className="space-y-8">
                    <Card title="Pending Requests" noPadding>
                        <div className="divide-y divide-slate-100">
                            {pendingLeaves.map((leave) => (
                                <div key={leave.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                            {leave.employee.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{leave.employee}</p>
                                            <p className="text-xs text-slate-500">{leave.type} • {leave.date}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="secondary">Review</Button>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All Requests</button>
                        </div>
                    </Card>

                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Upgrade Plan</h3>
                            <p className="text-indigo-100 text-sm mb-4">Get access to advanced payroll reports and AI insights.</p>
                            <Button size="sm" className="bg-white text-indigo-600 hover:bg-indigo-50 border-none w-full">View Plans</Button>
                        </div>
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
