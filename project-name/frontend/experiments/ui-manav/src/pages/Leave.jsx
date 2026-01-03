import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { leaveHistory } from '../data/dummyLeaves';
import { PlusCircle } from 'lucide-react';

/**
 * Leave Page
 * 
 * Purpose:
 * Apply for new leaves and view past leave history.
 */
const Leave = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Apply for Leave Form */}
            <div className="lg:col-span-1">
                <Card title="Apply for Leave" className="h-full">
                    <form className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-300">Leave Type</label>
                            <select className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 outline-none">
                                <option>Sick Leave</option>
                                <option>Casual Leave</option>
                                <option>Annual Leave</option>
                            </select>
                        </div>

                        <InputField label="Start Date" type="date" />
                        <InputField label="End Date" type="date" />

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-300">Reason</label>
                            <textarea
                                rows="3"
                                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-1 focus:ring-indigo-500 outline-none resize-none"
                                placeholder="Describe reason..."
                            />
                        </div>

                        <Button variant="primary" className="w-full flex items-center justify-center gap-2 mt-2">
                            <PlusCircle size={18} /> Apply Request
                        </Button>
                    </form>
                </Card>
            </div>

            {/* Leave History List */}
            <div className="lg:col-span-2">
                <Card title="Leave History" className="h-full">
                    <div className="space-y-4">
                        {leaveHistory.map((leave) => (
                            <div key={leave.id} className="p-4 bg-slate-700/20 rounded-xl border border-slate-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-semibold text-white">{leave.type}</span>
                                        <span className={`px-2 py-0.5 rounded text-xs border ${leave.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                leave.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            }`}>
                                            {leave.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400">{leave.reason}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-mono text-white">{leave.startDate}</p>
                                    <p className="text-xs text-slate-500">{leave.days} Day(s)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Leave;
