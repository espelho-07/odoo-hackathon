import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import EventCalendar from '../components/EventCalendar';
import { getCurrentUser, getData } from '../utils/storage';
import { Users, Clock, Calendar, CheckCircle, AlertCircle, TrendingUp, ArrowUpRight, BarChart3, PieChart as PieIcon, Briefcase, History } from 'lucide-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];

const Dashboard = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [dashboardData, setDashboardData] = useState({
        stats: [], recentLeaves: [], recentAttendance: [], departmentStats: [], attendanceTrend: [], workHoursData: [], extraHours: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return;
            setLoading(true);

            try {
                // Fetch basic stats from API (if available) - Assuming api.getStats exists
                // For now, let's keep some mock data structure but try to fetch what we can
                // or just simulate API calls if endpoints aren't fully ready for aggregated dashboard data

                // Real usage would be:
                // const statsRes = await api.getStats();
                // const leavesRes = await api.getLeaves(isAdmin ? null : user.id);
                // const attendanceRes = await api.getAttendance(isAdmin ? null : user.id, new Date().toISOString().split('T')[0]);

                // Using getData for now as fallback/hybrid during transition if API fails or is incomplete
                // BUT goal is to use API.

                // Let's implement hybrid loader:
                const allUsers = getData('dayflow_users'); // Fallback to local for now for complex stats not in minimal API
                const allAttendance = getData('dayflow_attendance');
                const allLeaves = getData('dayflow_leaves');

                let calculatedStats = [];
                let calculatedRecentLeaves = [];
                let calculatedRecentAttendance = [];
                let calculatedDeptStats = [];
                let attendanceTrend = [];
                let workHoursData = [];
                let extraHours = 0;

                const today = new Date().toISOString().split('T')[0];

                if (isAdmin) {
                    const pendingLeaves = allLeaves.filter(l => l.status === 'Pending').length;
                    const todayAttendance = allAttendance.filter(a => a.date === today).length;

                    // Department Stats
                    const depts = {};
                    allUsers.forEach(u => {
                        if (u.role !== 'admin') {
                            depts[u.department] = (depts[u.department] || 0) + 1;
                        }
                    });
                    calculatedDeptStats = Object.entries(depts).map(([name, count]) => ({ name: name || 'General', value: count }));

                    // Attendance Trend
                    for (let i = 4; i >= 0; i--) {
                        const d = new Date();
                        d.setDate(d.getDate() - i);
                        const dateStr = d.toISOString().split('T')[0];
                        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                        const count = allAttendance.filter(a => a.date === dateStr).length;
                        attendanceTrend.push({ name: dayName, present: count });
                    }

                    calculatedStats = [
                        { label: 'Total Employees', value: allUsers.length - 1, icon: Users, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500/10 dark:bg-blue-400/10', border: 'border-blue-500/20 dark:border-blue-400/20' },
                        { label: 'Present Today', value: todayAttendance, icon: Clock, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10 dark:bg-emerald-400/10', border: 'border-emerald-500/20 dark:border-emerald-400/20' },
                        { label: 'Pending Leaves', value: pendingLeaves, icon: Calendar, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10 dark:bg-amber-400/10', border: 'border-amber-500/20 dark:border-amber-400/20' },
                    ];
                    calculatedRecentLeaves = allLeaves.slice(0, 5);
                    calculatedRecentAttendance = allAttendance.slice(0, 5);
                } else {
                    const myAttendance = allAttendance.filter(a => a.userId === user.id);
                    const myLeaves = allLeaves.filter(l => l.userId === user.id);
                    const pendingMyLeaves = myLeaves.filter(l => l.status === 'Pending').length;

                    const totalHours = myAttendance.length * 8.5;
                    const expectedHours = myAttendance.length * 8;
                    extraHours = (totalHours - expectedHours).toFixed(1);

                    calculatedStats = [
                        { label: 'Days Present', value: myAttendance.length, icon: Clock, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-500/10 dark:bg-indigo-400/10', border: 'border-indigo-500/20 dark:border-indigo-400/20' },
                        { label: 'Leave Balance', value: '12', icon: Briefcase, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-500/10 dark:bg-purple-400/10', border: 'border-purple-500/20 dark:border-purple-400/20' },
                        { label: 'Pending Requests', value: pendingMyLeaves, icon: AlertCircle, color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-500/10 dark:bg-orange-400/10', border: 'border-orange-500/20 dark:border-orange-400/20' },
                    ];
                    calculatedRecentLeaves = myLeaves.slice(0, 3);
                    calculatedRecentAttendance = myAttendance.slice(-5).reverse();

                    // Work Hours Trend
                    for (let i = 6; i >= 0; i--) {
                        const d = new Date();
                        d.setDate(d.getDate() - i);
                        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                        const hours = 7 + Math.random() * 2;
                        workHoursData.push({ name: dayName, hours: parseFloat(hours.toFixed(1)) });
                    }
                }

                setDashboardData({
                    stats: calculatedStats,
                    recentLeaves: calculatedRecentLeaves,
                    recentAttendance: calculatedRecentAttendance,
                    departmentStats: calculatedDeptStats,
                    attendanceTrend,
                    workHoursData,
                    extraHours
                });
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user, isAdmin]);

    const { stats, recentLeaves, recentAttendance, departmentStats, attendanceTrend, workHoursData, extraHours } = dashboardData;

    if (!user) return null;

    const quickActions = isAdmin ? [
        { label: 'Verify Attendance', path: '/attendance', icon: ArrowUpRight },
        { label: 'Approve Leaves', path: '/timeoff', icon: ArrowUpRight },
        { label: 'Manage Employees', path: '/employees', icon: ArrowUpRight }
    ] : [
        { label: 'Apply for Leave', path: '/timeoff', icon: ArrowUpRight },
        { label: 'Update Profile', path: '/profile', icon: ArrowUpRight },
        { label: 'View Payslips', path: '/payroll', icon: ArrowUpRight }
    ];

    return (
        <PageLayout title={isAdmin ? "Admin Dashboard" : "My Dashboard"}>
            {/* Welcome Banner */}
            <div className={`relative overflow-hidden rounded-2xl p-8 mb-8 shadow-xl ${isAdmin ? 'bg-gradient-to-r from-purple-800 to-indigo-800' : 'bg-gradient-to-r from-indigo-800 to-purple-800'}`}>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {isAdmin ? `Hello Admin, ${user.name.split(' ')[0]}!` : `Welcome back, ${user.name.split(' ')[0]}!`}
                    </h2>
                    <p className="text-indigo-100 opacity-90">
                        {isAdmin ? 'Here is the system overview for today.' : "Here's what's happening in your workspace today."}
                    </p>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <TrendingUp size={120} color="white" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border ${stat.border} ${stat.bg} backdrop-blur-sm flex items-center justify-between transition-transform hover:-translate-y-1 shadow-sm`}>
                        <div>
                            <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${stat.color} opacity-90`}>{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">{stat.value}</h3>
                        </div>
                        <div className={`p-4 rounded-xl bg-white/50 dark:bg-white/5 ${stat.color}`}>
                            <stat.icon size={28} />
                        </div>
                    </div>
                ))}

                {/* Extra Hours Card (Employee Only or General Insight for Admin) */}
                {!isAdmin && (
                    <div className="p-6 rounded-2xl border border-pink-500/20 bg-pink-500/10 backdrop-blur-sm flex items-center justify-between transition-transform hover:-translate-y-1 shadow-sm">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider mb-2 text-pink-500 opacity-90">Extra Hours</p>
                            <h3 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">+{extraHours}h</h3>
                        </div>
                        <div className="p-4 rounded-xl bg-white/50 dark:bg-white/5 text-pink-500">
                            <History size={28} />
                        </div>
                    </div>
                )}
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (Charts & History) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Charts Section */}
                    {isAdmin ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Admin: Department Distribution */}
                            <Card title="Avg. Employee Distribution">
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={departmentStats}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {departmentStats.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4 mt-2">
                                    {departmentStats.map((entry, index) => (
                                        <div key={index} className="flex items-center gap-2 text-xs text-slate-500">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                            <span>{entry.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Admin: Weekly Attendance */}
                            <Card title="Weekly Attendance Trend">
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={attendanceTrend}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                            <RechartsTooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                                            />
                                            <Bar dataKey="present" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {/* Employee: Work Hours Trend */}
                            <Card title="Daily Work Hours">
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={workHoursData}>
                                            <defs>
                                                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                            <RechartsTooltip
                                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                                            />
                                            <Area type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Split History Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Attendance History */}
                        <Card title="Attendance Logs">
                            <div className="space-y-3">
                                {recentAttendance.length === 0 ? (
                                    <p className="text-slate-500 text-center py-4 text-sm">No recent logs.</p>
                                ) : (
                                    recentAttendance.map((log, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{log.date}</p>
                                                <p className="text-xs text-slate-500">{log.checkIn} - {log.checkOut || 'Active'}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${log.status === 'Late' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                {log.status || 'Present'}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>

                        {/* Leave History */}
                        <Card title="Recent Leaves">
                            <div className="space-y-3">
                                {recentLeaves.length === 0 ? (
                                    <p className="text-slate-500 text-center py-4 text-sm">No recent requests.</p>
                                ) : (
                                    recentLeaves.map((leave, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{leave.type}</p>
                                                <p className="text-xs text-slate-500">{leave.startDate}</p>
                                            </div>
                                            <div className={`p-1.5 rounded-full ${leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {leave.status === 'Approved' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Card>
                    </div>

                </div>

                {/* Right Column (Calendar & Actions) */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Event Calendar */}
                    <Card title="Event Calendar">
                        <EventCalendar />
                    </Card>

                    <Card title="Quick Actions">
                        <div className="space-y-3">
                            {quickActions.map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => navigate(action.path)}
                                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/20 flex items-center justify-between hover:bg-white dark:hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all group text-left shadow-sm hover:shadow-md"
                                >
                                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors font-medium">{action.label}</span>
                                    <action.icon size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

            </div>
        </PageLayout>
    );
};

export default Dashboard;
