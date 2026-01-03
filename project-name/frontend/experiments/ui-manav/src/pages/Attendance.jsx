import React from 'react';
import Card from '../components/Card';
import { attendanceData } from '../data/dummyAttendance';

/**
 * Attendance Page
 * 
 * Purpose:
 * View personal attendance history.
 */
const Attendance = () => {

    // Helper for status badge colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Absent': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'Late': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            default: return 'bg-slate-500/10 text-slate-400';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white">Attendance History</h2>
                    <p className="text-slate-400">View your daily check-in and check-out times.</p>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700 text-sm text-slate-300">
                    <span className="font-semibold text-white">October 2023</span>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-500 border-b border-slate-700 text-sm uppercase tracking-wider">
                                <th className="py-4 px-4 font-semibold">Date</th>
                                <th className="py-4 px-4 font-semibold">Status</th>
                                <th className="py-4 px-4 font-semibold">Check In</th>
                                <th className="py-4 px-4 font-semibold">Check Out</th>
                                <th className="py-4 px-4 font-semibold">Work Hours</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {attendanceData.map((record) => (
                                <tr key={record.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                    <td className="py-4 px-4 font-medium text-white">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2 py-1 rounded-md text-xs border ${getStatusColor(record.status)}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-slate-300">{record.checkIn}</td>
                                    <td className="py-4 px-4 text-slate-300">{record.checkOut}</td>
                                    <td className="py-4 px-4 text-slate-400 font-mono">
                                        {record.status === 'Present' ? '8h 00m' : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Attendance;
