import React, { useState } from 'react';
import { Plus, Check, X, Calendar, Search, Upload } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function TimeOff({ userRole }) {
    // Wireframe Functionality: 
    // - "NEW" Request Button
    // - "Paid/Sick" Balance Cards
    // - Modal with specific fields
    // UI Theme: NiceAdmin (Light)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const StatCard = ({ title, count, color }) => (
        <div className="card p-4 flex flex-col justify-center min-w-[200px] border-l-4" style={{ borderColor: color }}>
            <div className="text-gray-500 text-sm mb-1 font-semibold">{title}</div>
            <div className="text-[#012970] text-lg font-bold">{count} Days Available</div>
        </div>
    );

    return (
        <div className="animate-fade-in">

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#012970]">Time Off Requests</h2>
                {userRole === 'Employee' && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#4154f1] hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2"
                    >
                        <Plus size={18} /> New Request
                    </button>
                )}
            </div>

            {userRole === 'Employee' && (
                <div className="flex flex-wrap gap-6 mb-8">
                    <StatCard title="Paid Time Off" count="24" color="#4154f1" />
                    <StatCard title="Sick Time Off" count="07" color="#ff771d" />
                </div>
            )}

            {/* TABLE */}
            <div className="card overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#f6f9ff] text-[#012970] border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Start Date</th>
                                <th className="px-6 py-4 font-semibold">End Date</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                {userRole === 'Admin' && <th className="px-6 py-4 font-semibold text-right">Action</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-700">Anshkumar Darji</td>
                                <td className="px-6 py-4 text-gray-600">28/10/2025</td>
                                <td className="px-6 py-4 text-gray-600">28/10/2025</td>
                                <td className="px-6 py-4 text-[#4154f1] font-medium">Paid Time Off</td>
                                <td className="px-6 py-4"><StatusBadge status="Pending" /></td>
                                {userRole === 'Admin' && (
                                    <td className="px-6 py-4 flex gap-2 justify-end">
                                        <button className="bg-green-50 text-green-600 p-2 rounded hover:bg-green-100" title="Approve"><Check size={16} /></button>
                                        <button className="bg-red-50 text-red-600 p-2 rounded hover:bg-red-100" title="Reject"><X size={16} /></button>
                                    </td>
                                )}
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-700">Roshan</td>
                                <td className="px-6 py-4 text-gray-600">01/11/2025</td>
                                <td className="px-6 py-4 text-gray-600">02/11/2025</td>
                                <td className="px-6 py-4 text-[#4154f1] font-medium">Sick Time Off</td>
                                <td className="px-6 py-4"><StatusBadge status="Approved" /></td>
                                {userRole === 'Admin' && (
                                    <td className="px-6 py-4 text-right text-xs text-gray-400">Processed</td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL - NiceAdmin Theme with Wireframe Fields */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-[#012970] font-bold text-lg">New Time Off Request</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500"><X size={20} /></button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-5">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <label className="text-gray-500 text-xs uppercase font-bold text-right">Employee</label>
                                <div className="col-span-2 text-[#4154f1] font-semibold bg-blue-50 px-3 py-2 rounded">Roshan (You)</div>
                            </div>

                            <div className="grid grid-cols-3 items-center gap-4">
                                <label className="text-gray-500 text-xs uppercase font-bold text-right">Time off Type</label>
                                <div className="col-span-2">
                                    <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#4154f1] focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm p-2 bg-white border">
                                        <option>Paid Time Off</option>
                                        <option>Sick Time Off</option>
                                        <option>Unpaid Time Off</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 items-center gap-4">
                                <label className="text-gray-500 text-xs uppercase font-bold text-right">Validity Period</label>
                                <div className="col-span-2 grid grid-cols-2 gap-2">
                                    <input type="date" className="border border-gray-300 p-2 rounded text-xs" />
                                    <input type="date" className="border border-gray-300 p-2 rounded text-xs" />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 items-center gap-4">
                                <label className="text-gray-500 text-xs uppercase font-bold text-right">Allocation</label>
                                <div className="col-span-2 flex items-center gap-2">
                                    <input type="text" value="0.00" readOnly className="w-20 bg-gray-100 border border-gray-300 rounded p-2 text-sm text-center font-mono" />
                                    <span className="text-gray-500 text-xs font-bold">Days</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 items-start gap-4">
                                <label className="text-gray-500 text-xs uppercase font-bold text-right mt-2">Reason</label>
                                <div className="col-span-2">
                                    <textarea className="w-full border border-gray-300 rounded-md p-2 text-sm" rows="3" placeholder="Description (Optional)"></textarea>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 items-center gap-4">
                                <label className="text-gray-500 text-xs uppercase font-bold text-right">Attachment</label>
                                <div className="col-span-2 flex items-center gap-2">
                                    <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-600 px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors">
                                        <Upload size={14} /> Upload
                                    </button>
                                    <span className="text-gray-400 text-xs italic">(e.g. Medical Cert)</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Discard</button>
                            <button className="bg-[#4154f1] hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-all">Submit Request</button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
