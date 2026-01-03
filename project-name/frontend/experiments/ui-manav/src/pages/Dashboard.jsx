import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import { getCurrentUser, getData } from '../utils/storage';
import { Users, Clock, Calendar, CheckCircle, AlertCircle, TrendingUp, ArrowUpRight, BarChart3, PieChart } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const isAdmin = user?.role === 'admin';
    const [stats, setStats] = useState([]);
    const [recentLeaves, setRecentLeaves] = useState([]);
    const [departmentStats, setDepartmentStats] = useState([]);

    useEffect(() => {
        const allUsers = getData('dayflow_users');
        const allAttendance = getData('dayflow_attendance');
        const allLeaves = getData('dayflow_leaves');

        if (isAdmin) {
            const pendingLeaves = allLeaves.filter(l => l.status === 'Pending').length;
            const todayAttendance = allAttendance.filter(a => a.date === new Date().toISOString().split('T')[0]).length;

            // Calculate Department Dist (Mock)
            const depts = {};
            allUsers.forEach(u => {
                if (u.role !== 'admin') {
                    depts[u.department] = (depts[u.department] || 0) + 1;
                }
            });
            setDepartmentStats(Object.entries(depts).map(([name, count]) => ({ name: name || 'General', count })));

            setStats([
                { label: 'Total Employees', value: allUsers.length - 1, icon: Users, color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500/10 dark:bg-blue-400/10', border: 'border-blue-500/20 dark:border-blue-400/20' },
                { label: 'Present Today', value: todayAttendance, icon: Clock, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10 dark:bg-emerald-400/10', border: 'border-emerald-500/20 dark:border-emerald-400/20' },
                { label: 'Pending Requests', value: pendingLeaves, icon: Calendar, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10 dark:bg-amber-400/10', border: 'border-amber-500/20 dark:border-amber-400/20' },
            ]);
            setRecentLeaves(allLeaves.slice(0, 5));
        } else {
            const myAttendance = allAttendance.filter(a => a.userId === user.id);
            const myLeaves = allLeaves.filter(l => l.userId === user.id);
            const pendingMyLeaves = myLeaves.filter(l => l.status === 'Pending').length;

            setStats([
                { label: 'Days Present', value: myAttendance.length, icon: Clock, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-500/10 dark:bg-indigo-400/10', border: 'border-indigo-500/20 dark:border-indigo-400/20' },
                { label: 'Leave Balance', value: '12', icon: Calendar, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-500/10 dark:bg-purple-400/10', border: 'border-purple-500/20 dark:border-purple-400/20' },
                { label: 'Pending Requests', value: pendingMyLeaves, icon: AlertCircle, color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-500/10 dark:bg-orange-400/10', border: 'border-orange-500/20 dark:border-orange-400/20' },
            ]);
            setRecentLeaves(myLeaves.slice(0, 5));
        }
    }, [user.id, isAdmin]);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border ${stat.border} ${stat.bg} backdrop-blur-sm flex items-center justify-between transition-transform hover:-translate-y-1 shadow-sm`}>
                        <div>
                            <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${stat.color} opacity-90`}>{stat.label}</p>
                            <h3 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight">{stat.value}</h3>
                        </div>
                        <div className={`p-4 rounded-xl bg-white/50 dark:bg-white/5 ${stat.color}`}>
                            <stat.icon size={32} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts / Data Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Admin Chart / Employee List */}
                <div className="lg:col-span-2 space-y-8">
                    {isAdmin && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card title="Department Overview">
                                <div className="space-y-4">
                                    {departmentStats.map((dept, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-1 text-slate-600 dark:text-slate-300">
                                                <span>{dept.name}</span>
                                                <span className="font-semibold">{dept.count} Members</span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                                <div
                                                    className="bg-purple-500 h-2 rounded-full"
                                                    style={{ width: `${(dept.count / (stats[0]?.value || 1)) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                            <Card title="System Health">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full">
                                        <BarChart3 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-800 dark:text-white">98%</p>
                                        <p className="text-xs text-slate-500">Uptime</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
                                        <PieChart size={24} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-800 dark:text-white">45ms</p>
                                        <p className="text-xs text-slate-500">Avg Latency</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    <Card title={isAdmin ? "Recent Leave Requests" : "Your Leave History"} className="h-full">
                        <div className="space-y-3">
                            {recentLeaves.length === 0 ? (
                                <div className="text-center py-12 text-slate-500 bg-slate-100 dark:bg-slate-800/20 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                    <Calendar size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>No records found.</p>
                                </div>
                            ) : (
                                recentLeaves.map((leave, i) => (
                                    <div key={i} className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-indigo-500/30 transition-all shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-full ${leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                    leave.status === 'Rejected' ? 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400' :
                                                        'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                                                }`}>
                                                {leave.status === 'Approved' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                            </div>
                                            <div>
                                                <p className="text-slate-800 dark:text-white font-medium">{leave.type} Leave</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{leave.startDate} — {leave.endDate}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${leave.status === 'Approved' ? 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-400' :
                                                leave.status === 'Rejected' ? 'border-red-200 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/5 dark:text-red-400' :
                                                    'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/5 dark:text-amber-400'
                                            }`}>
                                            {leave.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card title="Quick Actions" className="h-full">
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
