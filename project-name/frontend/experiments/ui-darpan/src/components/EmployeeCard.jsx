import React from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * EmployeeCard Component
 * Displays summary info for a single employee.
 * 
 * @param {Object} props
 * @param {Object} props.employee - Employee data object
 * @param {Function} props.onClick - Handler for click event
 */
export default function EmployeeCard({ employee, onClick }) {
    return (
        <div
            onClick={() => onClick(employee)}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full bg-slate-100 object-cover border border-slate-100 group-hover:border-indigo-100 transition-colors"
                    />
                    <div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{employee.name}</h3>
                        <p className="text-sm text-slate-500">{employee.role}</p>
                    </div>
                </div>
                <StatusBadge status={employee.status} />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail size={14} className="text-slate-400" />
                    <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={14} className="text-slate-400" />
                    <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} className="text-slate-400" />
                    <span>Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
