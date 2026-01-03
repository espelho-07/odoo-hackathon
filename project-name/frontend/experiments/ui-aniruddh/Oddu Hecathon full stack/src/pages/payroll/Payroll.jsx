import { FiDollarSign, FiDownload, FiTrendingUp } from 'react-icons/fi';
import Table from '../../components/tables/Table';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { motion } from 'framer-motion';

const Payroll = () => {
    const payslips = [
        { id: 1, month: 'October 2023', basic: '$4,000', allowance: '$500', deductions: '$200', net: '$4,300', status: 'Paid' },
        { id: 2, month: 'September 2023', basic: '$4,000', allowance: '$500', deductions: '$200', net: '$4,300', status: 'Paid' },
        { id: 3, month: 'August 2023', basic: '$4,000', allowance: '$500', deductions: '$200', net: '$4,300', status: 'Paid' },
    ];

    const columns = [
        { header: 'Month', accessor: 'month', render: (row) => <span className="font-semibold text-slate-700">{row.month}</span> },
        { header: 'Basic Salary', accessor: 'basic' },
        { header: 'Allowances', accessor: 'allowance' },
        { header: 'Deductions', accessor: 'deductions', className: 'text-red-500' },
        { header: 'Net Salary', accessor: 'net', render: (row) => <span className="font-bold text-slate-800">{row.net}</span> },
        { 
            header: 'Status', 
            accessor: 'status',
            render: (row) => <Badge variant="success">{row.status}</Badge>
        },
        {
            header: 'Action',
            render: () => (
                <Button size="sm" variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                    <FiDownload className="mr-2" /> Slip
                </Button>
            )
        }
    ];

    return (
        <div className="space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
                <div>
                     <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Payroll</h1>
                     <p className="text-slate-500 mt-1">View your earnings and download payslips.</p>
                </div>
                <Button variant="secondary" className="shadow-sm">
                    <FiDownload className="mr-2" /> Download YTD Report
                </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Premium Stat Card 1 */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl shadow-emerald-200 relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"><FiDollarSign size={20} /></div>
                            <span className="text-emerald-50 font-medium">Last Salary</span>
                        </div>
                        <h3 className="text-4xl font-bold mb-1">$4,300</h3>
                        <p className="text-emerald-100 text-sm">Credited on Oct 31, 2023</p>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                </motion.div>

                 {/* Premium Stat Card 2 */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg relative overflow-hidden group"
                >
                     <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FiTrendingUp size={20} /></div>
                        <span className="text-slate-500 font-medium">YTD Earnings</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">$43,000</h3>
                    <p className="text-slate-400 text-sm">Jan 01 - Oct 31, 2023</p>
                </motion.div>
            </div>

            <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
                <div className="p-6 border-b border-slate-50">
                    <h3 className="text-lg font-bold text-slate-800">Payslip History</h3>
                </div>
                <Table 
                    columns={columns}
                    data={payslips}
                    pagination={{ from: 1, to: 3, total: 3, currentPage: 1, lastPage: 1 }}
                    onPageChange={() => {}}
                />
            </motion.div>
        </div>
    );
};

export default Payroll;
