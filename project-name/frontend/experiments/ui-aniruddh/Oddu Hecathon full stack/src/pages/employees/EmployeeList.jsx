import { useState } from 'react';
import { FiEdit2, FiTrash2, FiMoreVertical, FiUserPlus, FiMail, FiPhone } from 'react-icons/fi';
import Table from '../../components/tables/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { motion } from 'framer-motion';

const EmployeeList = () => {
    // Mock Data
    const employees = [
        { id: 1, name: 'John Doe', role: 'Developer', department: 'Engineering', status: 'Active', email: 'john@dayflow.com', phone: '+1 234 567 890' },
        { id: 2, name: 'Jane Smith', role: 'Designer', department: 'Design', status: 'On Leave', email: 'jane@dayflow.com', phone: '+1 987 654 321' },
        { id: 3, name: 'Mike Johnson', role: 'Manager', department: 'Product', status: 'Active', email: 'mike@dayflow.com', phone: '+1 112 233 445' },
        { id: 4, name: 'Sarah Wilson', role: 'HR Specialist', department: 'HR', status: 'Active', email: 'sarah@dayflow.com', phone: '+1 555 666 777' },
        { id: 5, name: 'Tom Brown', role: 'Developer', department: 'Engineering', status: 'Terminated', email: 'tom@dayflow.com', phone: '+1 999 000 111' },
    ];

    const columns = [
        { 
            header: 'Employee', 
            accessor: 'name', 
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm border border-slate-200">
                        {row.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900">{row.name}</p>
                        <p className="text-xs text-slate-500">{row.email}</p>
                    </div>
                </div>
            ) 
        },
        { header: 'Role', accessor: 'role', className: 'hidden md:table-cell' },
        { header: 'Department', accessor: 'department', className: 'hidden md:table-cell' },
        { 
            header: 'Status', 
            accessor: 'status', 
            render: (row) => (
                <Badge variant={row.status === 'Active' ? 'success' : row.status === 'On Leave' ? 'warning' : 'danger'}>
                    {row.status}
                </Badge>
            )
        },
    ];

    const actions = (row) => (
        <div className="flex justify-end gap-2">
            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                <FiEdit2 size={16} />
            </button>
             <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                <FiTrash2 size={16} />
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Employees</h1>
                    <p className="text-slate-500 mt-1">Manage your team members and their roles.</p>
                </div>
                <Button>
                    <FiUserPlus className="mr-2" /> Add Employee
                </Button>
            </motion.div>

            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
            >
                <Table 
                    columns={columns}
                    data={employees}
                    actions={actions}
                    pagination={{ from: 1, to: 5, total: 42, currentPage: 1, lastPage: 9 }}
                    onPageChange={() => {}}
                />
            </motion.div>
        </div>
    );
};

export default EmployeeList;
