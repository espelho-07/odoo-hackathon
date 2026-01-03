import React, { useState } from 'react';
import { attendanceRecords, todayAttendance } from '../data/attendance';
import StatusBadge from '../components/StatusBadge';
import { Clock, CheckCircle } from 'lucide-react';

/**
 * Attendance Page
 * Handles daily check-ins for employees and viewable logs for admins.
 */
export default function Attendance({ userRole }) {
    // Mock state for employee check-in
    const [checkedIn, setCheckedIn] = useState(todayAttendance.isCheckedIn);
    const [checkInTime, setCheckInTime] = useState(todayAttendance.checkInTime);

    const handleToggleCheckIn = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (checkedIn) {
            setCheckedIn(false);
            // In a real app, this would save checkout time
        } else {
            setCheckedIn(true);
            setCheckInTime(timeString);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Attendance & Tracking</h1>

            {/* Employee Section: Check-In/Out */}
            {userRole === 'Employee' && (
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mb-8 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                        <Clock size={40} />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-800 mb-1">
                        {checkedIn ? 'You are currently working' : 'Ready to start your day?'}
                    </h2>
                    <p className="text-slate-500 mb-6">
                        {checkedIn
                            ? `Checked in at ${checkInTime}`
                            : 'Please check in to mark your attendance.'}
                    </p>

                    <button
                        onClick={handleToggleCheckIn}
                        className={`px-8 py-3 rounded-xl font-bold text-lg transition-all transform active:scale-95 shadow-md ${checkedIn
                                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                            }`}
                    >
                        {checkedIn ? 'Check Out' : 'Check In Now'}
                    </button>
                </div>
            )}

            {/* Admin Section: Attendance Logs */}
            {userRole === 'Admin' && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                        <h3 className="font-semibold text-slate-800">Today's Logs (Simulated)</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">Employee</th>
                                    <th className="px-6 py-3">Check In</th>
                                    <th className="px-6 py-3">Check Out</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Work Hours</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {attendanceRecords.map(record => (
                                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-slate-800">{record.employeeName}</td>
                                        <td className="px-6 py-3 text-slate-600">{record.checkIn}</td>
                                        <td className="px-6 py-3 text-slate-600">{record.checkOut}</td>
                                        <td className="px-6 py-3">
                                            <StatusBadge status={record.status} />
                                        </td>
                                        <td className="px-6 py-3 text-slate-600">{record.workHours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
