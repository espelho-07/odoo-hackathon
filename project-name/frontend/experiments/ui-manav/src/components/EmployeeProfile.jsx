import React, { useState } from 'react';
import { User, IndianRupee } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * EmployeeProfile Component
 * Detailed view of an employee.
 * 
 * @param {Object} props
 * @param {Object} props.employee - Employee data
 * @param {string} props.userRole - To determine if salary is visible
 */
export default function EmployeeProfile({ employee, userRole }) {
    const [activeTab, setActiveTab] = useState('info');

    // Manav uses lowercase 'admin'
    const isAdmin = userRole === 'admin';

    const tabs = [
        { id: 'info', label: 'Personal Info', icon: User },
        ...(isAdmin ? [{ id: 'salary', label: 'Salary Info', icon: IndianRupee }] : []),
    ];

    return (
        <div>
            {/* Header Profile Info */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-3xl font-bold text-slate-600 dark:text-slate-300 border-4 border-slate-50 dark:border-slate-800">
                    {employee.avatar && employee.avatar.length === 1 ? employee.avatar : (
                        <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{employee.name}</h2>
                    <p className="text-slate-500 dark:text-slate-400 capitalize">{employee.role} • {employee.department || 'General'}</p>
                    <div className="mt-2">
                        <StatusBadge status={employee.status || 'Active'} />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                                }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
                {activeTab === 'info' && (
                    <div className="space-y-4">
                        <InfoRow label="Email" value={employee.email} />
                        <InfoRow label="Phone" value={employee.phone || 'N/A'} />
                        <InfoRow label="Join Date" value={employee.joinDate || 'N/A'} />
                        <InfoRow label="Employee ID" value={`EMP-${employee.id.toString().slice(-4)}`} />
                    </div>
                )}

                {activeTab === 'salary' && isAdmin && (
                    <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                        <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Compensation Details</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Confidential - Admin Only</p>

                        <InfoRow label="Base Salary" value={`₹${Number(employee.salary || 0).toLocaleString()}`} />
                        <InfoRow label="HRA (20%)" value={`₹${(Number(employee.salary || 0) * 0.2).toLocaleString()}`} />
                        <InfoRow label="PF Deduction" value={`-₹${(Number(employee.salary || 0) * 0.12).toLocaleString()}`} />
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
                            <div className="flex justify-between">
                                <span className="font-bold text-slate-800 dark:text-white">Net Payable</span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                    ₹{((Number(employee.salary || 0) * 1.08).toLocaleString())}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 dark:border-slate-800/50 last:border-0 border-dashed">
            <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
            <span className="text-sm font-medium text-slate-800 dark:text-white">{value}</span>
        </div>
    );
}
