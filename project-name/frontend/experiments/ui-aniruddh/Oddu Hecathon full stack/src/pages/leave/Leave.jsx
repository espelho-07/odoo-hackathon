import { useState } from 'react';
import { FiPlus, FiFilter } from 'react-icons/fi';
import Table from '../../components/tables/Table';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Input from '../../components/forms/Input';
import Badge from '../../components/common/Badge';
import { motion } from 'framer-motion';

const Leave = () => {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    
    // Mock Data
    const leaveHistory = [
        { id: 1, type: 'Sick Leave', from: '2023-10-10', to: '2023-10-12', days: 3, status: 'Approved', reason: 'Flu' },
        { id: 2, type: 'Casual Leave', from: '2023-09-15', to: '2023-09-15', days: 1, status: 'Rejected', reason: 'Personal work' },
        { id: 3, type: 'Privilege Leave', from: '2023-11-20', to: '2023-11-25', days: 6, status: 'Pending', reason: 'Vacation' },
    ];

    const columns = [
        { header: 'Leave Type', accessor: 'type', render: (row) => <span className="font-semibold text-slate-700">{row.type}</span> },
        { header: 'From', accessor: 'from' },
        { header: 'To', accessor: 'to' },
        { header: 'Duration', accessor: 'days', render: (row) => <span>{row.days} Days</span> },
        { header: 'Reason', accessor: 'reason', className: 'truncate max-w-xs hidden md:table-cell' },
        { 
            header: 'Status', 
            accessor: 'status',
            render: (row) => (
                <Badge variant={row.status === 'Approved' ? 'success' : row.status === 'Rejected' ? 'danger' : 'warning'}>
                    {row.status}
                </Badge>
            )
        },
    ];

    return (
        <div className="space-y-8">
             <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
                <div>
                     <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Leaves</h1>
                     <p className="text-slate-500 mt-1">Track your leave balance and history.</p>
                </div>
                <Button onClick={() => setIsApplyModalOpen(true)} className="shadow-lg shadow-indigo-200">
                    <FiPlus className="mr-2" /> Apply Leave
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Allowance', val: '24 Days', color: 'text-slate-800' },
                    { label: 'Used Leaves', val: '12 Days', color: 'text-orange-600' },
                    { label: 'Available Balance', val: '12 Days', color: 'text-green-600' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="text-center py-8 hover:-translate-y-1 transition-transform">
                            <p className="text-slate-500 mb-2 font-medium">{stat.label}</p>
                            <h3 className={`text-4xl font-bold ${stat.color}`}>{stat.val}</h3>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
            >
                <Card title="Leave History" noPadding>
                    <Table 
                        columns={columns}
                        data={leaveHistory}
                        pagination={{ from: 1, to: 3, total: 3, currentPage: 1, lastPage: 1 }}
                        onPageChange={() => {}}
                    />
                </Card>
            </motion.div>

            <Modal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                title="Apply for Leave"
                size="md"
            >
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Leave Type</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 bg-white appearance-none cursor-pointer transition-all">
                                <option>Sick Leave</option>
                                <option>Casual Leave</option>
                                <option>Privilege Leave</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <FiFilter className="rotate-180" /> 
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <Input label="From Date" type="date" />
                        <Input label="To Date" type="date" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason</label>
                        <textarea 
                            rows="4" 
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all resize-none"
                            placeholder="Please check reason..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setIsApplyModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Submit Request</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Leave;
