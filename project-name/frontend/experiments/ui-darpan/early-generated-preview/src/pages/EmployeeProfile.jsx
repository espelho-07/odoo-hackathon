import React, { useState } from 'react';
import { User, Calendar, IndianRupee } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

/**
 * EmployeeProfile Page/Component
 * Detailed view of an employee.
 * Note: Can be used as a full page or inside a modal.
 * 
 * @param {Object} props
 * @param {Object} props.employee - Employee data
 * @param {string} props.userRole - To determine if salary is visible
 */
export default function EmployeeProfile({ employee, userRole }) {
    const [activeTab, setActiveTab] = useState('info');

    const tabs = [
        { id: 'info', label: 'Personal Info', icon: User },
        // Only show salary tab to Admins
        ...(userRole === 'Admin' ? [{ id: 'salary', label: 'Salary Info', icon: IndianRupee }] : []),
    ];

    return (
        <div>
            {/* Header Profile Info */}
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-slate-50"
                />
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
                    <p className="text-slate-500">{employee.role} • {employee.department}</p>
                    <div className="mt-2">
                        <StatusBadge status={employee.status} />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700'
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
                        <InfoRow label="Phone" value={employee.phone} />
                        <InfoRow label="Join Date" value={employee.joinDate} />
                        <InfoRow label="Employee ID" value={`EMP-${employee.id.toString().padStart(3, '0')}`} />
                    </div>
                )}

                {activeTab === 'salary' && userRole === 'Admin' && (
                    <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <h3 className="font-semibold text-slate-800 mb-2">Compensation Details</h3>
                        <p className="text-xs text-slate-500 mb-4">Confidential - Admin Only</p>

                        <InfoRow label="Base Salary" value={`₹${employee.salary.toLocaleString()}`} />
                        <InfoRow label="HRA (20%)" value={`₹${(employee.salary * 0.2).toLocaleString()}`} />
                        <InfoRow label="PF Deduction" value={`-₹${(employee.salary * 0.12).toLocaleString()}`} />
                        <div className="pt-2 border-t border-slate-200 mt-2">
                            <div className="flex justify-between">
                                <span className="font-bold text-slate-800">Net Payable</span>
                                <span className="font-bold text-indigo-600">
                                    ₹{((employee.salary * 1.08).toLocaleString())}
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
        <div className="flex flex-col sm:flex-row sm:justify-between py-1">
            <span className="text-sm text-slate-500">{label}</span>
            <span className="text-sm font-medium text-slate-800">{value}</span>
        </div>
    );
}
