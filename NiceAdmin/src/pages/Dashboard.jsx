import React from 'react';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { employees } from '../data/employees';
import { leaveRequests } from '../data/leaves';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard({ userRole }) {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === 'Active').length;
    const onLeave = employees.filter(e => e.status === 'On Leave').length;
    const pendingLeaves = leaveRequests.filter(req => req.status === 'Pending').length;

    const StatCard = ({ title, value, icon: Icon, colorClass, subtext }) => (
        <div className="card hover:scale-[1.02] transition-transform">
            <div className="flex items-center">
                <div className={`rounded-full w-16 h-16 flex items-center justify-center ${colorClass} bg-opacity-15 mr-4`}>
                    <Icon size={32} className={colorClass.replace('text-', 'text-opacity-100 text-')} />
                </div>
                <div>
                    <h5 className="text-[#899bbd] text-sm font-medium mb-1">{title}</h5>
                    <h6 className="text-2xl font-bold text-[#012970]">{value}</h6>
                    <span className="text-xs text-gray-400 mt-1 block">{subtext}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Employees"
                    value={totalEmployees}
                    icon={Users}
                    colorClass="text-blue-600 bg-blue-100"
                    subtext="Total workforce"
                />
                <StatCard
                    title="Present Today"
                    value={activeEmployees}
                    icon={UserCheck}
                    colorClass="text-green-600 bg-green-100"
                    subtext="Checked in today"
                />
                <StatCard
                    title="On Leave"
                    value={onLeave}
                    icon={UserX}
                    colorClass="text-orange-600 bg-orange-100"
                    subtext="Approved leaves"
                />
                <StatCard
                    title="Pending Requests"
                    value={pendingLeaves}
                    icon={Clock}
                    colorClass="text-yellow-600 bg-yellow-100"
                    subtext="Requires approval"
                />
            </div>

            {/* ADMIN ANALYTICS SECTION (Charts) */}
            {userRole === 'Admin' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Attendance Chart */}
                    <div className="card">
                        <div className="card-title">Attendance Overview <span>| Last 5 Days</span></div>
                        <div className="h-[250px] w-full">
                            {/* Simulated Data Note */}
                            {/* Chart data is simulated for hackathon demo. */}
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { day: 'Mon', present: 22 },
                                    { day: 'Tue', present: 24 },
                                    { day: 'Wed', present: 18 }, // Dip due to holiday/sick
                                    { day: 'Thu', present: 23 },
                                    { day: 'Fri', present: 21 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ fill: '#f6f9ff' }}
                                    />
                                    <Bar dataKey="present" fill="#4154f1" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Leave Distribution Chart */}
                    <div className="card">
                        <div className="card-title">Leave Distribution <span>| Current Month</span></div>
                        <div className="h-[250px] w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Paid Leave', value: 12 },
                                            { name: 'Sick Leave', value: 5 },
                                            { name: 'Unpaid', value: 2 },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        <Cell fill="#4154f1" /> {/* Blue - Paid */}
                                        <Cell fill="#2eca6a" /> {/* Green - Sick (Approved) */}
                                        <Cell fill="#ff771d" /> {/* Orange - Unpaid */}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                        formatter={(value) => <span className="text-sm text-gray-500 font-medium ml-1">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            <div className="card">
                <h5 className="card-title">Recent Activity <span>| Today</span></h5>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#f6f9ff] text-[#012970]">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Employee</th>
                                <th className="px-4 py-3 font-semibold">Department</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {employees.slice(0, 5).map(emp => (
                                <tr key={emp.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-700">{emp.name}</td>
                                    <td className="px-4 py-3 text-gray-500">{emp.department}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={emp.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
