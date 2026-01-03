import React from 'react';
import { employees } from '../data/employees';
import StatusBadge from '../components/StatusBadge';
import { Lock } from 'lucide-react';

/**
 * Salary Page
 * Admin-only view of payroll details.
 */
export default function Salary({ userRole }) {
    if (userRole !== 'Admin') {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
                <Lock size={48} className="mb-4 text-slate-300" />
                <h2 className="text-xl font-bold text-slate-600">Access Restricted</h2>
                <p>You do not have permission to view payroll information.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Payroll Overview</h1>
                    <p className="text-sm text-slate-500">Confidential employee salary data</p>
                </div>
                <div className="text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    Demo Mode: Simplified calculations
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900 text-slate-300 font-medium">
                            <tr>
                                <th className="px-6 py-4">Employee</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4 text-right">Base Salary</th>
                                <th className="px-6 py-4 text-right">HRA (+20%)</th>
                                <th className="px-6 py-4 text-right">PF (-12%)</th>
                                <th className="px-6 py-4 text-right bg-slate-800 text-white">Net Payable</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {employees.map(emp => {
                                const hra = emp.salary * 0.2;
                                const pf = emp.salary * 0.12;
                                const total = emp.salary + hra - pf;

                                return (
                                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-800">{emp.name}</td>
                                        <td className="px-6 py-4 text-slate-500">{emp.role}</td>
                                        <td className="px-6 py-4 text-right text-slate-600">₹{emp.salary.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right text-slate-600">₹{hra.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right text-red-500">-₹{pf.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-bold text-indigo-600 bg-slate-50/50">
                                            ₹{total.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
