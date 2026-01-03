import React from 'react';
import Card from '../components/Card';
import { User, Clock, Calendar, CreditCard, ArrowUpRight } from 'lucide-react';
import { currentUser } from '../data/dummyEmployees';

/**
 * EmployeeDashboard Page
 * 
 * Purpose:
 * Landing page for employees after login.
 * Shows quick stats and links to other sections.
 */
const EmployeeDashboard = () => {
    const stats = [
        { label: "Attendance", value: "95%", desc: "This Month", icon: Clock, color: "bg-blue-500", link: "/attendance" },
        { label: "Leave Balance", value: "12 Days", desc: "Available", icon: Calendar, color: "bg-emerald-500", link: "/leave" },
        { label: "Next Pay", value: "$4,200", desc: "Due Oct 31", icon: CreditCard, color: "bg-violet-500", link: "/payroll" },
        { label: "Profile Est.", value: "85%", desc: "Complete", icon: User, color: "bg-amber-500", link: "/profile" },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Hello, {currentUser.name.split(' ')[0]} 👋</h2>
                    <p className="text-slate-400">Here's what's happening today.</p>
                </div>
                <div className="text-right text-slate-400 text-sm bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:border-indigo-500/50 transition-colors cursor-pointer group relative overflow-hidden">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    {stat.desc}
                                </p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-white shadow-lg`}>
                                <stat.icon size={24} className={`opacity-80`} />
                            </div>
                        </div>
                        <div className={`absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
                            <ArrowUpRight size={16} className="text-indigo-400" />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Area - Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Recent Activity">
                        <div className="space-y-4">
                            {[
                                { title: "Logged in from Chrome", time: "2 mins ago", type: "Security" },
                                { title: "Leave request approved", time: "2 hours ago", type: "Notification" },
                                { title: "October Payslip generated", time: "Yesterday", type: "Payroll" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                                    <div>
                                        <p className="text-sm font-medium text-white">{item.title}</p>
                                        <p className="text-xs text-slate-500">{item.type}</p>
                                    </div>
                                    <span className="text-xs text-slate-400">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Quick Actions / Announcements */}
                <div className="space-y-6">
                    <Card title="Announcements">
                        <div className="p-3 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                            <p className="text-sm text-indigo-200 font-medium mb-1">Hackathon 2023</p>
                            <p className="text-xs text-indigo-300/80">
                                Join us for the annual coding hackathon starting next Friday!
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
