import React from 'react';
import { Users, UserCheck, UserMinus, TrendingUp } from 'lucide-react';
import { employees } from '../data/employees';
import { attendanceRecords } from '../data/attendance';

/**
 * Dashboard Page
 * Displays summary statistics.
 */
export default function Dashboard() {
    // Calculate real-time stats from dummy data
    const totalEmployees = employees.length;
    const presentToday = attendanceRecords.filter(r => r.status === 'Present').length;
    const onLeave = employees.filter(e => e.status === 'On Leave').length;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Employees"
                    value={totalEmployees}
                    icon={Users}
                    color="bg-blue-50 text-blue-600"
                />
                <StatsCard
                    title="Present Today"
                    value={presentToday}
                    icon={UserCheck}
                    color="bg-green-50 text-green-600"
                />
                <StatsCard
                    title="On Leave"
                    value={onLeave}
                    icon={UserMinus}
                    color="bg-amber-50 text-amber-600"
                />
                <StatsCard
                    title="Departments"
                    value="4"
                    icon={TrendingUp}
                    color="bg-purple-50 text-purple-600"
                />
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
                <div className="text-sm text-slate-500">
                    Use the sidebar to navigate to specific modules.
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    );
}
