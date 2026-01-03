import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import { getCurrentUser } from '../utils/storage';
import api from '../utils/api';
import { Clock, PlayCircle, StopCircle, Users, CheckCircle, AlertCircle, XCircle, Loader2 } from 'lucide-react';

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
    const [stats, setStats] = useState(null);
    const [todayRecord, setTodayRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Attendance
            const attRes = await api.getAttendance(isAdmin ? null : user.id, null);
            const attData = attRes.data || [];
            setAttendance(attData);

            // Set Today's Record for Employee
            if (!isAdmin) {
                const today = new Date().toISOString().split('T')[0];
                const todayRec = attData.find(a => a.date.startsWith(today));
                setTodayRecord(todayRec);
            }

            // Fetch Stats for Admin
            if (isAdmin) {
                // Fetch basic stats from API or calculate from lists if needed
                // For now, let's fetch lists to calculate manually as per original logic if API doesn't support aggregate yet
                const empRes = await api.getEmployees();
                const leavesRes = await api.getLeaves(null, 'Approved');
                const employees = empRes.data || [];
                const leaves = leavesRes.data || [];

                const today = new Date().toISOString().split('T')[0];

                const totalEmployees = employees.length;
                // Present today: unique user_ids in attendance today
                const presentToday = attData.filter(a => a.date.startsWith(today)).length;

                // On Leave Today
                const onLeaveToday = leaves.filter(l => {
                    return l.status === 'Approved' && l.start_date <= today && l.end_date >= today;
                }).length;

                const notPresent = Math.max(0, totalEmployees - presentToday - onLeaveToday);

                setStats({ totalEmployees, presentToday, onLeaveToday, notPresent });
            }

        } catch (error) {
            console.error("Failed to fetch attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePunch = async (type) => { // 'in' or 'out'
        try {
            if (type === 'in') {
                await api.checkIn(user.id);
            } else if (type === 'out') {
                await api.checkOut(user.id);
            }
            fetchData(); // Refresh integration
        } catch (error) {
            alert(error.message);
        }
    };

    // Table Config
    const columns = [
        { header: "Date", accessor: (row) => row.date.split('T')[0] },
        {
            header: "Status", accessor: (row) => (
                <span className={`px-2 py-1 rounded text-xs border ${row.status === 'Present' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' :
                    'bg-red-500/20 text-red-400 border-red-500/20'
                    }`}>
                    {row.status}
                </span>
            )
        },
        { header: "Check In", accessor: "check_in" }, // API uses snake_case, or map it
        { header: "Check Out", accessor: (row) => row.check_out || '-' },
    ];

    if (isAdmin) {
        columns.unshift({ header: "Employee", accessor: "name" }); // API join returns name
    }

    return (
        <PageLayout title="Attendance">
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-indigo-500" size={40} />
                </div>
            ) : (
                <>
                    {isAdmin && stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4 animate-fadeIn">
                            <Card className="flex items-center gap-4 border-l-4 border-l-indigo-500">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Employees</p>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalEmployees}</h3>
                                </div>
                            </Card>

                            <Card className="flex items-center gap-4 border-l-4 border-l-emerald-500">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Present Today</p>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.presentToday}</h3>
                                </div>
                            </Card>

                            <Card className="flex items-center gap-4 border-l-4 border-l-amber-500">
                                <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">On Leave</p>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.onLeaveToday}</h3>
                                </div>
                            </Card>

                            <Card className="flex items-center gap-4 border-l-4 border-l-red-500">
                                <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <XCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Not Present</p>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.notPresent}</h3>
                                </div>
                            </Card>
                        </div>
                    )}

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
                                    {todayRecord && !todayRecord.check_out && (
                                        <Button onClick={() => handlePunch('out')} className="bg-red-500 hover:bg-red-600 flex items-center gap-2 px-6 py-3 text-lg">
                                            <StopCircle /> Check Out
                                        </Button>
                                    )}
                                    {todayRecord && todayRecord.check_out && (
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
                </>
            )}
        </PageLayout>
    );
};

export default Attendance;
