import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import { getCurrentUser, getData, setData } from '../utils/storage';
import { Clock, PlayCircle, StopCircle } from 'lucide-react';

/**
 * Attendance Page
 * 
 * Purpose:
 * - Employee: Check In / Check Out. View history.
 * - Admin: View all employee attendance.
 */
const Attendance = () => {
    const user = getCurrentUser();
    const isAdmin = user?.role === 'admin';
    const [attendance, setAttendance] = useState([]);
    const [todayRecord, setTodayRecord] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const allAttendance = getData('dayflow_attendance');
        const today = new Date().toISOString().split('T')[0];

        if (isAdmin) {
            setAttendance(allAttendance);
        } else {
            const myAttendance = allAttendance.filter(a => a.userId === user.id);
            setAttendance(myAttendance);

            // Check if already checked in today
            const todayRec = myAttendance.find(a => a.date === today);
            setTodayRecord(todayRec);
        }
    };

    const handlePunch = (type) => { // 'in' or 'out'
        const allAttendance = getData('dayflow_attendance');
        const today = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

        if (type === 'in') {
            const newRecord = {
                id: Date.now(),
                userId: user.id,
                date: today,
                status: 'Present',
                checkIn: time,
                checkOut: '-'
            };
            allAttendance.push(newRecord);
        } else if (type === 'out' && todayRecord) {
            const index = allAttendance.findIndex(a => a.id === todayRecord.id);
            if (index !== -1) {
                allAttendance[index].checkOut = time;
            }
        }

        setData('dayflow_attendance', allAttendance);
        loadData(); // Refresh state
    };

    // Table Config
    const columns = [
        { header: "Date", accessor: "date" },
        {
            header: "Status", accessor: (row) => (
                <span className={`px-2 py-1 rounded text-xs border ${row.status === 'Present' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' :
                        'bg-red-500/20 text-red-400 border-red-500/20'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: "Check In", accessor: "checkIn" },
        { header: "Check Out", accessor: "checkOut" },
    ];

    if (isAdmin) {
        columns.unshift({ header: "Employee ID", accessor: "userId" });
    }

    return (
        <PageLayout title="Attendance">
            {!isAdmin && (
                <div className="mb-8">
                    <Card className="flex flex-col md:flex-row items-center justify-between gap-6 border-indigo-500/20 bg-gradient-to-r from-slate-800 to-indigo-900/20">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <Clock className="text-indigo-400" />
                                {todayRecord ? "You are checked in." : "Mark your attendance"}
                            </h2>
                            <p className="text-slate-400">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>

                        <div>
                            {!todayRecord && (
                                <Button onClick={() => handlePunch('in')} className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 px-6 py-3 text-lg">
                                    <PlayCircle /> Check In
                                </Button>
                            )}
                            {todayRecord && todayRecord.checkOut === '-' && (
                                <Button onClick={() => handlePunch('out')} className="bg-red-500 hover:bg-red-600 flex items-center gap-2 px-6 py-3 text-lg">
                                    <StopCircle /> Check Out
                                </Button>
                            )}
                            {todayRecord && todayRecord.checkOut !== '-' && (
                                <div className="text-emerald-400 font-semibold border border-emerald-500/30 px-4 py-2 rounded-lg bg-emerald-500/10">
                                    Day Completed
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            )}

            <Card title={isAdmin ? "All Attendance Records" : "My Attendance History"}>
                <Table columns={columns} data={attendance} />
            </Card>
        </PageLayout>
    );
};

export default Attendance;
