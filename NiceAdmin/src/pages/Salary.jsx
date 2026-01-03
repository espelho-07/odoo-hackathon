import React from 'react';
import { employees } from '../data/employees';
import StatusBadge from '../components/StatusBadge';
import { Download, Filter, Lock } from 'lucide-react';

export default function Salary({ userRole }) {
    if (userRole !== 'Admin') {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <Lock size={48} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-[#012970]">Access Restricted</h2>
                <p className="text-gray-500 mt-2 max-w-md">
                    You do not have permission to view payroll information. Only Administrators can access this module.
                </p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-[#012970]">Payroll Overview</h2>
                    <p className="text-sm text-gray-500">Manage employee salaries and deductions</p>
                </div>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow-sm hover:bg-green-700 transition">
                    <Download size={18} />
                    <span>Export CSV</span>
                </button>
            </div>

            <div className="card overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#f6f9ff] text-[#012970] border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Employee</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold text-right">Base Salary</th>
                                <th className="px-6 py-4 font-semibold text-right">HRA (+20%)</th>
                                <th className="px-6 py-4 font-semibold text-right">PF (-12%)</th>
                                <th className="px-6 py-4 font-semibold text-right text-[#4154f1]">Net Payable</th>
                                <th className="px-6 py-4 font-semibold text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {employees.map(emp => {
                                const hra = emp.basicSalary * 0.2;
                                const pf = emp.basicSalary * 0.12;
                                const net = emp.basicSalary + hra - pf;

                                return (
                                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">{emp.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{emp.role}</td>
                                        <td className="px-6 py-4 text-right font-mono text-gray-600">₹{emp.basicSalary.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono text-green-600">+₹{hra.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono text-red-500">-₹{pf.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-[#012970] bg-blue-50/30">
                                            ₹{net.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Processed</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-right text-xs text-gray-400 mt-2">
                * Salary calculation is simplified for hackathon demo.
            </div>
        </div>
    );
}
