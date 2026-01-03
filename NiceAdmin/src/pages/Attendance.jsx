import React, { useState } from 'react';
import { attendanceRecords } from '../data/attendance';
import StatusBadge from '../components/StatusBadge';
import { Search, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter } from 'lucide-react';

export default function Attendance({ userRole }) {
    // Wireframe functionality: Employee Summary Cards & Admin Table Columns
    // UI Theme: NiceAdmin (Light)

    const [currentMonth, setCurrentMonth] = useState('October 2025');

    const EmployeeSummaryCard = ({ label, value, icon, color }) => (
        <div className="card p-4 flex items-center justify-between shadow-sm border-l-4" style={{ borderColor: color }}>
            <div>
                <div className="text-xs text-gray-500 uppercase font-bold mb-1">{label}</div>
                <div className="text-xl font-bold text-[#012970]">{value}</div>
            </div>
        </div>
    );

    // NiceAdmin styled summary
    const EmployeeStats = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <EmployeeSummaryCard label="Days Present" value="20" color="#2eca6a" />
            <EmployeeSummaryCard label="Leaves Taken" value="02" color="#ff771d" />
            <EmployeeSummaryCard label="Total Working Days" value="22" color="#4154f1" />
        </div>
    );

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#012970]">
                    {userRole === 'Admin' ? 'Attendance Logs' : 'My Attendance'}
                </h2>

                {userRole === 'Admin' && (
                    <div className="flex gap-2">
                        <button className="btn-sm bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded hover:bg-gray-50 text-sm">
                            <ChevronLeft size={16} />
                        </button>
                        <div className="bg-white border border-gray-300 px-4 py-1 flex items-center text-sm font-semibold text-[#012970] rounded">
                            {currentMonth}
                        </div>
                        <button className="btn-sm bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded hover:bg-gray-50 text-sm">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            {userRole === 'Employee' && <EmployeeStats />}

            {/* TABLE */}
            <div className="card overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#f6f9ff] text-[#012970] border-b border-gray-100">
                            <tr>
                                {userRole === 'Admin' && <th className="px-6 py-4 font-semibold">Emp</th>}
                                <th className="px-6 py-4 font-semibold">{userRole === 'Employee' ? 'Date' : 'Check In'}</th>
                                <th className="px-6 py-4 font-semibold">{userRole === 'Employee' ? 'Check In' : 'Check Out'}</th>
                                <th className="px-6 py-4 font-semibold">{userRole === 'Employee' ? 'Check Out' : 'Work Hours'}</th>
                                <th className="px-6 py-4 font-semibold">{userRole === 'Employee' ? 'Work Hours' : 'Extra Hours'}</th>
                                <th className="px-6 py-4 font-semibold">{userRole === 'Employee' ? 'Extra Hours' : ''}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* Dummy Rows Matching Wireframe Logic but NiceAdmin Style */}
                            {userRole === 'Admin' ? (
                                <>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-700">Roshan</td>
                                        <td className="px-6 py-4 text-gray-600">10:00</td>
                                        <td className="px-6 py-4 text-gray-600">19:00</td>
                                        <td className="px-6 py-4 text-gray-600">09:00</td>
                                        <td className="px-6 py-4 text-green-600 font-medium">01:00</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-700">Anshkumar</td>
                                        <td className="px-6 py-4 text-gray-600">10:00</td>
                                        <td className="px-6 py-4 text-gray-600">19:00</td>
                                        <td className="px-6 py-4 text-gray-600">09:00</td>
                                        <td className="px-6 py-4 text-green-600 font-medium">01:00</td>
                                    </tr>
                                </>
                            ) : (
                                <>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-700">28/10/2025</td>
                                        <td className="px-6 py-4 text-gray-600">10:00</td>
                                        <td className="px-6 py-4 text-gray-600">19:00</td>
                                        <td className="px-6 py-4 text-gray-600">09:00</td>
                                        <td className="px-6 py-4 text-green-600 font-medium">01:00</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-700">29/10/2025</td>
                                        <td className="px-6 py-4 text-gray-600">10:00</td>
                                        <td className="px-6 py-4 text-gray-600">19:00</td>
                                        <td className="px-6 py-4 text-gray-600">09:00</td>
                                        <td className="px-6 py-4 text-green-600 font-medium">01:00</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Functional Note from Wireframe */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                <h4 className="font-bold mb-1 flex items-center gap-2"><div className="w-2 h-2 bg-blue-600 rounded-full"></div> Attendance Rules</h4>
                <p>Unpaid leave or missing attendance days automatically reduce payable days for payslip generation.</p>
            </div>

        </div>
    );
}
