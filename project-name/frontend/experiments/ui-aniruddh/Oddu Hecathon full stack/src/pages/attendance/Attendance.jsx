import { useState } from 'react';
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import Table from '../../components/tables/Table';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

const Attendance = () => {
    // Mock Data
    const attendanceHistory = [
        { id: 1, date: '2023-10-25', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', duration: '9h 0m' },
        { id: 2, date: '2023-10-24', checkIn: '09:15 AM', checkOut: '06:15 PM', status: 'Present', duration: '9h 0m' },
        { id: 3, date: '2023-10-23', checkIn: '-', checkOut: '-', status: 'Absent', duration: '-' },
        { id: 4, date: '2023-10-20', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Late', duration: '8h 30m' },
    ];

    const columns = [
        { header: 'Date', accessor: 'date' },
        { 
            header: 'Status', 
            accessor: 'status',
            render: (row) => (
                <Badge variant={row.status === 'Present' ? 'success' : row.status === 'Absent' ? 'danger' : 'warning'}>
                    {row.status}
                </Badge>
            )
        },
        { header: 'Check In', accessor: 'checkIn' },
        { header: 'Check Out', accessor: 'checkOut' },
        { header: 'Working Hours', accessor: 'duration' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">My Attendance</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <FiCheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Present Days</p>
                        <h3 className="text-xl font-bold text-slate-800">18</h3>
                    </div>
                </Card>
                 <Card className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-full">
                        <FiXCircle size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Absent Days</p>
                        <h3 className="text-xl font-bold text-slate-800">2</h3>
                    </div>
                </Card>
                 <Card className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                        <FiClock size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Avg Hours</p>
                        <h3 className="text-xl font-bold text-slate-800">8h 45m</h3>
                    </div>
                </Card>
            </div>

            <Card title="Attendance History">
                <Table 
                    columns={columns}
                    data={attendanceHistory}
                    pagination={{ from: 1, to: 4, total: 4, currentPage: 1, lastPage: 1 }}
                    onPageChange={() => {}}
                />
            </Card>
        </div>
    );
};

export default Attendance;
