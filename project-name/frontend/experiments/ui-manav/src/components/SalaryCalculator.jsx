import React, { useEffect, useState } from 'react';
import InputField from './components/InputField';

// Helper to format currency
const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const SalaryCalculator = ({ wage, isEditing, onChange, formData, onFormChange }) => {
    const monthlyWage = Number(wage) || 0;
    const yearlyWage = monthlyWage * 12;

    // Calculation Logic
    // Basic = 50% of Wage
    const basic = monthlyWage * 0.50;

    // HRA = 50% of Basic
    const hra = basic * 0.50;

    // Standard Allowance (Fixed for this demo)
    const stdAllowance = 4167; // approx 50k/year

    // PF = 12% of Basic
    const pf = basic * 0.12;

    // Prof Tax (Fixed)
    const profTax = 200;

    // Performance Bonus = 8.33% of Basic
    const bonus = basic * 0.0833;

    // Leave Travel = 8.33% of Basic
    const lta = basic * 0.0833;

    // Fixed Allowance = Remainder
    // Total Components = Basic + HRA + Std + Bonus + LTA + Fixed
    // Wage = Sum(Components) -> Fixed = Wage - (Basic + HRA + Std + Bonus + LTA)
    let fixedAllowance = monthlyWage - (basic + hra + stdAllowance + bonus + lta);
    if (fixedAllowance < 0) fixedAllowance = 0;

    const ComponentRow = ({ label, value, percentage, subtext }) => (
        <div className="flex justify-between items-start py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div>
                <p className="font-medium text-slate-700 dark:text-slate-300">{label}</p>
                {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
            </div>
            <div className="text-right">
                <p className="font-mono font-semibold text-slate-800 dark:text-white">{formatCurrency(value)} / month</p>
                {percentage && <p className="text-xs text-slate-500">{percentage}</p>}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Top Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Monthly Wage</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={wage}
                                onChange={(e) => onChange(e.target.value)}
                                disabled={!isEditing}
                                className="w-full text-3xl font-bold bg-transparent border-none focus:ring-0 p-0 text-slate-900 dark:text-white placeholder-slate-300"
                                placeholder="0"
                            />
                            <span className="text-sm text-slate-400 font-normal">/ Month</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Yearly Wage</label>
                        <p className="text-xl font-medium text-slate-600 dark:text-slate-400">{formatCurrency(yearlyWage)} <span className="text-sm font-normal">/ Year</span></p>
                    </div>
                </div>
                <div className="space-y-4 border-l border-slate-200 dark:border-slate-700 pl-8">
                    <InputField
                        label="Working Days / Week"
                        name="workingDays"
                        value={formData.workingDays || '5'}
                        onChange={onFormChange}
                        disabled={!isEditing}
                        placeholder="5"
                    />
                    <InputField
                        label="Break Time (mins)"
                        name="breakTime"
                        value={formData.breakTime || '60'}
                        onChange={onFormChange}
                        disabled={!isEditing}
                        placeholder="60"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Salary Components */}
                <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                        Salary Components
                    </h4>
                    <div className="space-y-1">
                        <ComponentRow label="Basic Salary" value={basic} percentage="50.00% of Wage" subtext="Base salary component" />
                        <ComponentRow label="House Rent Allowance" value={hra} percentage="50.00% of Basic" subtext="Tax exemption benefit" />
                        <ComponentRow label="Standard Allowance" value={stdAllowance} subtext="Fixed statutory deduction" />
                        <ComponentRow label="Performance Bonus" value={bonus} percentage="8.33% of Basic" />
                        <ComponentRow label="Leave Travel Allowance" value={lta} percentage="8.33% of Basic" />
                        <ComponentRow label="Fixed Allowance" value={fixedAllowance} subtext="Balancing component" />
                    </div>
                </div>

                {/* Deductions & PF */}
                <div className="space-y-8">
                    <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                            Provident Fund (PF)
                        </h4>
                        <div className="space-y-1">
                            <ComponentRow label="Employee PF" value={pf} percentage="12% of Basic" subtext="Deducted from salary" />
                            <ComponentRow label="Employer PF" value={pf} percentage="12% of Basic" subtext="Company contribution" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                            Tax Deductions
                        </h4>
                        <div className="space-y-1">
                            <ComponentRow label="Professional Tax" value={profTax} subtext="State government tax" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryCalculator;
