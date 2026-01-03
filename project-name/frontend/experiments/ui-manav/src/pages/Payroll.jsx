import React from 'react';
import Card from '../components/Card';
import { DollarSign, Download, TrendingUp } from 'lucide-react';
import Button from '../components/Button';

/**
 * Payroll Page
 * 
 * Purpose:
 * View salary details and payslips.
 */
const Payroll = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Payroll & Salary</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Salary Card */}
                <Card className="bg-gradient-to-br from-indigo-900 to-indigo-800 border-indigo-500/30 text-white">
                    <div className="p-2 mb-4 bg-white/10 w-fit rounded-lg">
                        <DollarSign size={24} />
                    </div>
                    <p className="text-indigo-200 text-sm font-medium">Net Salary (Oct)</p>
                    <h3 className="text-3xl font-bold mt-1">$4,250.00</h3>
                </Card>

                {/* Deductions Card */}
                <Card className="bg-slate-800 border-slate-700">
                    <div className="p-2 mb-4 bg-slate-700 w-fit rounded-lg text-slate-300">
                        <TrendingUp size={24} />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Total Deductions</p>
                    <h3 className="text-3xl font-bold text-white mt-1">$350.00</h3>
                    <p className="text-xs text-slate-500 mt-2">Tax: $200 | Insurance: $150</p>
                </Card>
            </div>

            {/* Payslip History */}
            <Card title="Payslips">
                <div className="space-y-2">
                    {[
                        { month: "October 2023", amount: "$4,250.00", date: "Oct 31, 2023", status: "Paid" },
                        { month: "September 2023", amount: "$4,250.00", date: "Sep 30, 2023", status: "Paid" },
                        { month: "August 2023", amount: "$4,100.00", date: "Aug 31, 2023", status: "Paid" },
                    ].map((slip, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-slate-700/20 rounded-lg border border-slate-700/50 hover:bg-slate-700/40 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hidden sm:block">
                                    <FileIcon />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{slip.month}</p>
                                    <p className="text-xs text-slate-400">Processed: {slip.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="text-white font-mono font-medium hidden sm:block">{slip.amount}</span>
                                <span className="px-2 py-1 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    {slip.status}
                                </span>
                                <Button variant="ghost" className="p-2 text-slate-400 hover:text-white">
                                    <Download size={18} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

// Simple Icon helper
const FileIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
);

export default Payroll;
