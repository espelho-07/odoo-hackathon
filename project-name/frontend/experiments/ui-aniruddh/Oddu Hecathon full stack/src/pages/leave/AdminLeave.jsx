import { useState } from 'react';
import { FiCheck, FiX, FiFilter } from 'react-icons/fi';
import Table from '../../components/tables/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { toast } from 'react-toastify';

const AdminLeave = () => {
    const [requests, setRequests] = useState([
        { id: 1, employee: 'John Doe', type: 'Sick Leave', from: '2023-10-25', to: '2023-10-26', days: 2, status: 'Pending', reason: 'Not feeling well' },
        { id: 2, employee: 'Mike Johnson', type: 'Casual Leave', from: '2023-11-01', to: '2023-11-05', days: 5, status: 'Pending', reason: 'Family function' },
        { id: 3, employee: 'Jane Smith', type: 'Privilege Leave', from: '2023-10-15', to: '2023-10-18', days: 4, status: 'Approved', reason: 'Vacation' },
    ]);

    const handleAction = (id, action) => {
        setRequests(requests.map(req => 
            req.id === id ? { ...req, status: action === 'approve' ? 'Approved' : 'Rejected' } : req
        ));
        toast.success(`Leave request ${action}d successfully`);
    };

    const columns = [
        { header: 'Employee', accessor: 'employee', render: (row) => <span className="font-medium text-slate-900">{row.employee}</span> },
        { header: 'Type', accessor: 'type' },
        { header: 'Duration', render: (row) => <span>{row.from} to {row.to} ({row.days} days)</span> },
        { header: 'Reason', accessor: 'reason', className: 'truncate max-w-xs' },
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

    const actions = (row) => {
        if (row.status !== 'Pending') return null;
        return (
            <div className="flex justify-end gap-2">
                <button 
                    onClick={() => handleAction(row.id, 'approve')} 
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                    title="Approve"
                >
                    <FiCheck size={20} />
                </button>
                <button 
                    onClick={() => handleAction(row.id, 'reject')} 
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Reject"
                >
                    <FiX size={20} />
                </button>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Leave Requests</h2>

            <div className="flex gap-4 mb-6">
                 <div className="relative">
                    <select className="pl-4 pr-10 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 bg-white appearance-none">
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>
                    <FiFilter className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table 
                    columns={columns}
                    data={requests}
                    actions={actions}
                    pagination={{ from: 1, to: 3, total: 3, currentPage: 1, lastPage: 1 }}
                    onPageChange={() => {}}
                />
            </div>
        </div>
    );
};

export default AdminLeave;
