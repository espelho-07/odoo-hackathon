import { FiPlus } from 'react-icons/fi';
import Table from '../../components/tables/Table';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const AdminPayroll = () => {
    // Mock Data
    const payrollData = [
        { id: 1, employee: 'John Doe', month: 'October 2023', net: '$4,300', status: 'Paid' },
        { id: 2, employee: 'Jane Smith', month: 'October 2023', net: '$5,100', status: 'Processing' },
        { id: 3, employee: 'Mike Johnson', month: 'October 2023', net: '$3,800', status: 'Paid' },
    ];

    const columns = [
        { header: 'Employee', accessor: 'employee', render: (row) => <span className="font-medium text-slate-900">{row.employee}</span> },
        { header: 'Month', accessor: 'month' },
        { header: 'Net Salary', accessor: 'net' },
        { 
            header: 'Status', 
            accessor: 'status',
            render: (row) => (
                <Badge variant={row.status === 'Paid' ? 'success' : 'warning'}>
                    {row.status}
                </Badge>
            )
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Payroll Management</h2>
                <Button>
                    <FiPlus className="mr-2" /> Process Payroll
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table 
                    columns={columns}
                    data={payrollData}
                     pagination={{ from: 1, to: 3, total: 3, currentPage: 1, lastPage: 1 }}
                    onPageChange={() => {}}
                />
            </div>
        </div>
    );
};

export default AdminPayroll;
