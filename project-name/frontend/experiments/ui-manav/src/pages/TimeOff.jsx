import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { getCurrentUser, getData, setData } from '../utils/storage';

/**
 * TimeOff Page (Leave Management)
 * 
 * Purpose:
 * - Employee: Apply for leave. View own requests.
 * - Admin: Approve / Reject requests.
 */
const TimeOff = () => {
    const user = getCurrentUser();
    const isAdmin = user?.role === 'admin';
    const [leaves, setLeaves] = useState([]);
    const [refresh, setRefresh] = useState(0);

    // Form State (Employee only)
    const [formData, setFormData] = useState({
        type: 'Sick',
        startDate: '',
        endDate: '',
        reason: ''
    });

    useEffect(() => {
        const allLeaves = getData('dayflow_leaves');
        if (isAdmin) {
            setLeaves(allLeaves);
        } else {
            setLeaves(allLeaves.filter(l => l.userId === user.id));
        }
    }, [refresh, isAdmin, user.id]);

    const handleApply = (e) => {
        e.preventDefault();
        const allLeaves = getData('dayflow_leaves');
        const newLeave = {
            id: Date.now(),
            userId: user.id,
            status: 'Pending',
            ...formData,
        };

        allLeaves.unshift(newLeave); // Add to top
        setData('dayflow_leaves', allLeaves);
        setRefresh(prev => prev + 1);
        setFormData({ type: 'Sick', startDate: '', endDate: '', reason: '' }); // Reset
    };

    const handleAction = (id, action) => { // 'Approved' | 'Rejected'
        const allLeaves = getData('dayflow_leaves');
        const index = allLeaves.findIndex(l => l.id === id);
        if (index !== -1) {
            allLeaves[index].status = action;
            setData('dayflow_leaves', allLeaves);
            setRefresh(prev => prev + 1);
        }
    };

    const columns = [
        { header: "Type", accessor: "type" },
        { header: "Dates", accessor: (row) => `${row.startDate} to ${row.endDate}` },
        { header: "Reason", accessor: "reason" },
        {
            header: "Status", accessor: (row) => (
                <span className={`px-2 py-1 rounded text-xs border ${row.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' :
                        row.status === 'Rejected' ? 'bg-red-500/20 text-red-400 border-red-500/20' :
                            'bg-amber-500/20 text-amber-400 border-amber-500/20'
                    }`}>
                    {row.status}
                </span>
            )
        },
    ];

    if (isAdmin) {
        columns.unshift({ header: "Employee ID", accessor: "userId" });
    }

    return (
        <PageLayout title={isAdmin ? "Leave Requests" : "My Time Off"}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Application Form (Employee Only) */}
                {!isAdmin && (
                    <div className="lg:col-span-1">
                        <Card title="Apply for Leave">
                            <form onSubmit={handleApply} className="space-y-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-300">Leave Type</label>
                                    <select
                                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="Sick">Sick Leave</option>
                                        <option value="Casual">Casual Leave</option>
                                        <option value="Paid">Paid Leave</option>
                                        <option value="Unpaid">Unpaid Leave</option>
                                    </select>
                                </div>
                                <InputField
                                    label="Start Date"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    required
                                />
                                <InputField
                                    label="End Date"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    required
                                />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-300">Reason</label>
                                    <textarea
                                        rows="3"
                                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                                        value={formData.reason}
                                        onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">Submit Request</Button>
                            </form>
                        </Card>
                    </div>
                )}

                {/* List View */}
                <div className={isAdmin ? "lg:col-span-3" : "lg:col-span-2"}>
                    <Card title="History">
                        <Table
                            columns={columns}
                            data={leaves}
                            actions={isAdmin ? (row) => (
                                row.status === 'Pending' && (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => handleAction(row.id, 'Approved')}
                                            className="px-2 py-1 text-xs bg-emerald-600 hover:bg-emerald-700"
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() => handleAction(row.id, 'Rejected')}
                                            className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700"
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                )
                            ) : null}
                        />
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
};

export default TimeOff;
