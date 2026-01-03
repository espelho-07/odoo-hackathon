import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Table from '../components/Table';
import { getCurrentUser, getData } from '../utils/storage';
import { DollarSign, Download, FileCheck } from 'lucide-react';
import Button from '../components/Button';

const Payroll = () => {
    const user = getCurrentUser();
    const isAdmin = user?.role === 'admin';
    const [payrollData, setPayrollData] = useState([]);

    useEffect(() => {
        const users = getData('dayflow_users');
        if (isAdmin) {
            setPayrollData(users.filter(u => u.role !== 'admin'));
        } else {
            setPayrollData([user]);
        }
    }, [isAdmin, user?.id]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

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
        { header: "Department", accessor: "department" },
        { header: "Basic", accessor: (row) => <span className="font-mono text-slate-400">{formatCurrency(row.salary)}</span> },
        {
            header: "Net Salary", accessor: (row) => (
                <span className="font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    {formatCurrency(row.salary * 1.1)}
                </span>
            )
        },
        {
            header: "Status", accessor: () => (
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <FileCheck size={14} className="text-indigo-400" /> Processed
                </span>
            )
        }
    ];

    if (!isAdmin) {
        columns.shift();
    }

    return (
        <PageLayout title="Payroll">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats */}
                <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/20">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/10 rounded-xl text-white">
                            <DollarSign size={24} />
                        </div>
                        <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded text-indigo-100">This Month</span>
                    </div>
                    <div>
                        <p className="text-indigo-200 text-sm font-medium">Total Disbursement</p>
                        <h3 className="text-3xl font-bold text-white mt-1">$45,250.00</h3>
                    </div>
                </Card>

                <div className="lg:col-span-2">
                    <Card title={isAdmin ? "Payroll Registry" : "My Salary History"}>
                        <Table columns={columns} data={payrollData}
                            actions={() => (
                                <Button variant="ghost" className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white">
                                    <Download size={18} />
                                </Button>
                            )}
                        />
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
};

export default Payroll;
