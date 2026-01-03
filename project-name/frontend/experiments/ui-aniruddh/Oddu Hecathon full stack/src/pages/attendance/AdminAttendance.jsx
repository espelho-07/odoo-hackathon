import { useState } from 'react';
import { FiCheck, FiX, FiFilter } from 'react-icons/fi';
import Table from '../../components/tables/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AdminAttendance = () => {
     // Mock Data
    const attendanceData = [
        { id: 1, employee: 'John Doe', date: 'Oct 24, 2023', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present' },
        { id: 2, employee: 'Jane Smith', date: 'Oct 24, 2023', checkIn: '09:15 AM', checkOut: '06:15 PM', status: 'Late' },
        { id: 3, employee: 'Mike Johnson', date: 'Oct 24, 2023', checkIn: '-', checkOut: '-', status: 'Absent' },
        { id: 4, employee: 'Sarah Wilson', date: 'Oct 24, 2023', checkIn: '08:55 AM', checkOut: '05:55 PM', status: 'Present' },
    ];

    const columns = [
        { 
            header: 'Employee', 
            accessor: 'employee', 
            render: (row) => (
                <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs border border-slate-200">
                        {row.employee.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-900">{row.employee}</span>
                </div>
            ) 
        },
        { header: 'Date', accessor: 'date' },
        { header: 'Check In', accessor: 'checkIn' },
        { header: 'Check Out', accessor: 'checkOut' },
         { 
            header: 'Status', 
            accessor: 'status', 
            render: (row) => (
                <Badge variant={row.status === 'Present' ? 'success' : row.status === 'Absent' ? 'danger' : 'warning'}>
                    {row.status}
                </Badge>
            )
        },
    ];

    return (
        <div className="space-y-6">
             <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
                <div>
                     <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Attendance Logs</h1>
                     <p className="text-slate-500 mt-1">Monitor daily check-ins and check-outs.</p>
                </div>
                
                 <div className="flex gap-3">
                    <div className="relative">
                        <select className="pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 bg-white appearance-none text-sm font-medium text-slate-600 shadow-sm cursor-pointer hover:border-slate-300 transition-colors">
                            <option>All Status</option>
                            <option>Present</option>
                            <option>Absent</option>
                            <option>Late</option>
                        </select>
                        <FiFilter className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
                    </div>
                    <Button variant="secondary">Export CSV</Button>
                </div>
            </motion.div>

            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
            >
                <Table 
                    columns={columns}
                    data={attendanceData}
                    pagination={{ from: 1, to: 4, total: 4, currentPage: 1, lastPage: 1 }}
                    onPageChange={() => {}}
                />
            </motion.div>
        </div>
    );
};

export default AdminAttendance;
