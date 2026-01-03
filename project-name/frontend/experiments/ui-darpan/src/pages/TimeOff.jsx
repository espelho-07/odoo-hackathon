import React, { useState } from 'react';
import { leaveRequests as initialLeaves } from '../data/leaves';
import StatusBadge from '../components/StatusBadge';
import { Check, X, Plus } from 'lucide-react';
import Modal from '../components/Modal';

/**
 * TimeOff Page
 * Employees can request leave.
 * Admins can approve/reject.
 */
export default function TimeOff({ userRole }) {
    const [leaves, setLeaves] = useState(initialLeaves);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock form state
    const [type, setType] = useState('Paid Leave');
    const [reason, setReason] = useState('');

    const handleApply = (e) => {
        e.preventDefault();
        const newLeave = {
            id: Date.now(),
            employeeId: 99, // Current user
            employeeName: "Demo User",
            type,
            startDate: "2023-11-10", // Dummy date
            endDate: "2023-11-12",
            reason,
            status: "Pending"
        };
        setLeaves([newLeave, ...leaves]);
        setIsModalOpen(false);
        setReason('');
    };

    const handleAction = (id, newStatus) => {
        setLeaves(leaves.map(l => l.id === id ? { ...l, status: newStatus } : l));
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Leave Management</h1>

                {userRole === 'Employee' && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        Apply for Leave
                    </button>
                )}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Employee</th>
                                <th className="px-6 py-3">Leave Type</th>
                                <th className="px-6 py-3">Duration</th>
                                <th className="px-6 py-3">Reason</th>
                                <th className="px-6 py-3">Status</th>
                                {userRole === 'Admin' && <th className="px-6 py-3 text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {leaves.map(leave => (
                                <tr key={leave.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-3 font-medium text-slate-800">{leave.employeeName}</td>
                                    <td className="px-6 py-3 text-slate-600">{leave.type}</td>
                                    <td className="px-6 py-3 text-slate-500 text-xs">
                                        {leave.startDate} to {leave.endDate}
                                    </td>
                                    <td className="px-6 py-3 text-slate-600 truncate max-w-[200px]" title={leave.reason}>{leave.reason}</td>
                                    <td className="px-6 py-3">
                                        <StatusBadge status={leave.status} />
                                    </td>
                                    {userRole === 'Admin' && leave.status === 'Pending' && (
                                        <td className="px-6 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleAction(leave.id, 'Approved')}
                                                    className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 border border-green-200"
                                                    title="Approve"
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(leave.id, 'Rejected')}
                                                    className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 border border-red-200"
                                                    title="Reject"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                    {userRole === 'Admin' && leave.status !== 'Pending' && <td className="px-6 py-3"></td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Apply Leave Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Apply for Leave">
                <form onSubmit={handleApply} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option>Paid Leave</option>
                            <option>Sick Leave</option>
                            <option>Casual Leave</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm h-24 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Why are you taking leave?"
                            required
                        ></textarea>
                    </div>
                    <p className="text-xs text-slate-400">Date selection is disabled for this demo.</p>
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
