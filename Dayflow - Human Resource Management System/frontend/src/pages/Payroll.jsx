import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { getCurrentUser, getData } from '../utils/storage';
import { IndianRupee, Download, FileCheck, Eye, Printer } from 'lucide-react';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);
};

const PayslipModal = ({ employee, onClose }) => {
    if (!employee) return null;

    const basic = Number(employee.salary || 0);
    const hra = basic * 0.20;
    const gross = basic + hra;

    const pf = basic * 0.12;
    const pt = 200; // Standard Professional Tax assumption for visual completeness
    const totalDeductions = pf + pt;

    const netPay = gross - totalDeductions;

    return (
        <Modal isOpen={!!employee} onClose={onClose} title={`Payslip: ${employee.name}`}>
            <div className="space-y-6">
                {/* Header Details */}
                <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                    <div>
                        <p className="text-slate-500">Employee ID</p>
                        <p className="font-semibold text-slate-900 dark:text-white uppercase">{employee.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-500">Pay Period</p>
                        <p className="font-semibold text-slate-900 dark:text-white">August 2024</p>
                    </div>
                    <div>
                        <p className="text-slate-500">Department</p>
                        <p className="font-semibold text-slate-900 dark:text-white capitalize">{employee.department || 'General'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-500">Designation</p>
                        <p className="font-semibold text-slate-900 dark:text-white capitalize">{employee.role}</p>
                    </div>
                </div>

                {/* Financials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Earnings */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Earnings</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-300">Basic Salary</span>
                                <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(basic)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-300">HRA (20%)</span>
                                <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(hra)}</span>
                            </div>
                            <div className="flex justify-between text-indigo-400 pt-2 font-semibold">
                                <span>Gross Earnings</span>
                                <span>{formatCurrency(gross)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Deductions */}
                    <div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Deductions</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-300">Provident Fund (12%)</span>
                                <span className="font-medium text-red-500">{formatCurrency(pf)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600 dark:text-slate-300">Professional Tax</span>
                                <span className="font-medium text-red-500">{formatCurrency(pt)}</span>
                            </div>
                            <div className="flex justify-between text-red-400 pt-2 font-semibold">
                                <span>Total Deductions</span>
                                <span>{formatCurrency(totalDeductions)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Net Pay Net */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl flex justify-between items-center border border-indigo-100 dark:border-indigo-500/30">
                    <div>
                        <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium">Net Salary Payable</p>
                        <p className="text-xs text-indigo-400">Total Earnings - Total Deductions</p>
                    </div>
                    <p className="text-2xl font-bold text-indigo-700 dark:text-white">{formatCurrency(netPay)}</p>
                </div>

                {/* Action Footer */}
                <div className="flex justify-end pt-4 gap-3">
                    {/* Placeholder for Print/Download */}
                    <Button variant="ghost" className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        <Printer size={16} /> Print
                    </Button>
                    <Button className="flex items-center gap-2">
                        <Download size={16} /> Download PDF
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

const Payroll = () => {
    const user = getCurrentUser();
    const isAdmin = user?.role === 'admin';
    const [payrollData] = useState(() => {
        const users = getData('dayflow_users');
        if (isAdmin) {
            return users.filter(u => u.role !== 'admin');
        } else {
            return [user];
        }
    });

    const [selectedSlip, setSelectedSlip] = useState(null);

    // Calculate Totals for Summary Card
    const totalDisbursement = payrollData.reduce((acc, curr) => {
        const basic = Number(curr.salary || 0);
        // Net = Basic + HRA(20%) - PF(12%)  => Basic * 1.08
        const net = basic * 1.08;
        return acc + net;
    }, 0);


    const columns = [
        {
            header: "Employee", accessor: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                        {row.avatar || row.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium text-white">{row.name}</p>
                        <p className="text-xs text-slate-500">{row.email}</p>
                    </div>
                </div>
            )
        },
        { header: "Dept", accessor: "department" },
        { header: "Basic Pay", accessor: (row) => <span className="font-mono text-slate-400">{formatCurrency(row.salary)}</span> },
        {
            header: "Allowances",
            accessor: (row) => <span className="font-mono text-slate-400">{formatCurrency(row.salary * 0.2)}</span>,
            className: "hidden md:table-cell"
        },
        {
            header: "Deductions",
            accessor: (row) => <span className="font-mono text-red-400">{formatCurrency(row.salary * 0.12)}</span>,
            className: "hidden md:table-cell"
        },
        {
            header: "Net Salary", accessor: (row) => (
                <span className="font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    {formatCurrency(row.salary * 1.08)}
                </span>
            )
        },
        {
            header: "Action", accessor: (row) => (
                <Button
                    variant="ghost"
                    className="p-1.5 hover:bg-slate-700 text-indigo-400"
                    onClick={() => setSelectedSlip(row)}
                >
                    <Eye size={18} />
                </Button>
            )
        }
    ];

    if (!isAdmin) {
        // Remove Employee column for self view if redundant, but actually keeping it matches standard table view
        // Maybe remove Action if they can just see it in profile? No, Payslip view is nice here too.
        // columns.shift(); // Keep it consistent
    }

    return (
        <PageLayout title="Payroll Processing">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Stats */}
                <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 border-indigo-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <IndianRupee size={120} className="text-white" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-300 border border-indigo-500/30">
                                <IndianRupee size={28} />
                            </div>
                            <span className="text-xs font-medium bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded border border-emerald-500/20">
                                Month of August
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Disbursement</p>
                            <h3 className="text-4xl font-bold text-white mt-2 tracking-tight">{formatCurrency(totalDisbursement)}</h3>
                        </div>
                    </div>
                </Card>

                {/* Info Card or Action */}
                <Card className="lg:col-span-2 flex flex-col justify-center items-start gap-4 bg-slate-800/50 border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-400">
                            <FileCheck size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Payroll Cycle Active</h3>
                            <p className="text-slate-400 text-sm">Next disbursement scheduled for September 1st. All attendance records for August are locked.</p>
                        </div>
                    </div>
                    {isAdmin && (
                        <div className="w-full h-px bg-slate-700/50 my-2"></div>
                    )}
                    {isAdmin && (
                        <div className="flex gap-3">
                            <Button variant="secondary" className="text-sm">Run Audit</Button>
                            <Button className="text-sm bg-indigo-600 hover:bg-indigo-500">Process Batch Payment</Button>
                        </div>
                    )}
                </Card>
            </div>

            <Card title={isAdmin ? "Employee Payroll Registry" : "My Payslips"}>
                <Table columns={columns} data={payrollData} />
            </Card>

            {/* Payslip Modal */}
            {selectedSlip && (
                <PayslipModal employee={selectedSlip} onClose={() => setSelectedSlip(null)} />
            )}
        </PageLayout>
    );
};

export default Payroll;
