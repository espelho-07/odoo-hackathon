import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
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
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl font-bold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-600 group-hover:border-indigo-100 transition-colors">
                        {employee.avatar ? (
                            employee.avatar.length === 1 ? employee.avatar : (
                                <img
                                    src={employee.avatar}
                                    alt={employee.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            )
                        ) : (
                            employee.name.charAt(0)
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{employee.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{employee.role}</p>
                    </div>
                </div>
                <StatusBadge status={employee.status || 'Active'} />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Mail size={14} className="text-slate-400 dark:text-slate-500" />
                    <span className="truncate">{employee.email}</span>
                </div>
                {employee.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Phone size={14} className="text-slate-400 dark:text-slate-500" />
                        <span>{employee.phone}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar size={14} className="text-slate-400 dark:text-slate-500" />
                    <span>Joined {employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : 'N/A'}</span>
                </div>
            </div>
        </div>
    );
}
