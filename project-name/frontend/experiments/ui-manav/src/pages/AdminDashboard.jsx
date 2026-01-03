import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { employees } from '../data/dummyEmployees';
import { pendingLeaves } from '../data/dummyLeaves';
import { Users, FileText, CheckCircle, XCircle } from 'lucide-react';

/**
 * AdminDashboard Page
 * 
 * Purpose:
 * Central hub for HR/Admins to view employee stats and manage requests.
 */
const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Admin Overview</h2>
                <Button variant="primary">+ Add Employee</Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-indigo-900/20 border-indigo-500/30">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Employees</p>
                            <h3 className="text-2xl font-bold text-white">{employees.length}</h3>
                        </div>
                    </div>
                </Card>

                <Card className="bg-amber-900/20 border-amber-500/30">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Pending Leaves</p>
                            <h3 className="text-2xl font-bold text-white">{pendingLeaves.length}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Employee List */}
                <Card title="All Employees">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-500 border-b border-slate-700 text-sm">
                                    <th className="py-3 px-2">Name</th>
                                    <th className="py-3 px-2">Role</th>
                                    <th className="py-3 px-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-slate-300">
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                                        <td className="py-3 px-2 font-medium text-white">{emp.name}</td>
                                        <td className="py-3 px-2">{emp.role}</td>
                                        <td className="py-3 px-2">
                                            <span className={`px-2 py-1 rounded text-xs ${emp.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Pending Requests */}
                <Card title="Leave Requests">
                    <div className="space-y-4">
                        {pendingLeaves.map((leave) => (
                            <div key={leave.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-700">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold text-white">{leave.employeeName}</p>
                                        <p className="text-xs text-slate-400">{leave.type} • {leave.days} Day(s)</p>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500">{leave.startDate}</span>
                                </div>
                                <p className="text-sm text-slate-300 mb-3 italic">"{leave.reason}"</p>
                                <div className="flex gap-2">
                                    <Button variant="primary" className="text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-700">
                                        Approve
                                    </Button>
                                    <Button variant="secondary" className="text-xs px-3 py-1 hover:bg-red-900/50 hover:text-red-400 hover:border-red-900">
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {pendingLeaves.length === 0 && (
                            <p className="text-slate-500 text-center py-4">No pending requests.</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
