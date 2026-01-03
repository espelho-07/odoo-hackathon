import React, { useState } from 'react';
import { User, Wallet, Briefcase, Mail, MapPin, Calendar, Shield, FileText, Lock, LayoutDashboard } from 'lucide-react';


export default function EmployeeProfile({ employee, userRole }) {
    // Tabs from Wireframe: Overview | Resume | Private Info | Salary Info | Security
    const [activeTab, setActiveTab] = useState('overview');

    if (!employee) return null;

    const TabButton = ({ id, label, icon: Icon, restricted }) => {
        if (restricted && userRole !== 'Admin') return null;
        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all border-b-2 ${activeTab === id
                    ? 'border-[#4154f1] text-[#4154f1]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
            >
                {Icon && <Icon size={16} />}
                {label}
            </button>
        );
    };

    const Field = ({ label, value }) => (
        <div className="mb-4">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">{label}</label>
            <div className="text-sm font-semibold text-[#012970] border-b border-gray-100 pb-1 w-full">
                {value || "-"}
            </div>
        </div>
    );

    // Salary Calculation for Table
    const { basicSalary, allowances, deductions } = employee;
    const grossSalary = basicSalary + (allowances?.hra || 0) + (allowances?.standard || 0) + (allowances?.lta || 0) + (allowances?.special || 0);
    const totalDeductions = (deductions?.pf || 0) + (deductions?.tax || 0);
    const netSalary = grossSalary - totalDeductions;
    const yearlyPackage = grossSalary * 12;

    return (
        <div className="animate-fade-in">
            {/* Wireframe Header Style */}
            <div className="bg-[#f6f9ff] -m-6 mb-6 p-6 border-b border-gray-200 flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                    <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-sm">
                        {/* Edit Icon could go here */}
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-[#012970]">{employee.name}</h2>
                    <p className="text-gray-500 font-medium">{employee.role} • {employee.department}</p>
                    <p className="text-xs text-gray-400 mt-1">ID: IOI{employee.name.substring(0, 2).toUpperCase()}202300{employee.id}</p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                <TabButton id="overview" label="Overview" icon={LayoutDashboard} />
                <TabButton id="resume" label="Resume" icon={FileText} />
                <TabButton id="private" label="Private Info" icon={User} />
                <TabButton id="salary" label="Salary Info" icon={Wallet} restricted={true} />
                <TabButton id="security" label="Security" icon={Shield} />
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">

                {/* OVERVIEW TAB (Wireframe: Dashboard-like summary + About/Skills) */}
                {activeTab === 'overview' && (
                    <div className="animate-fade-in space-y-6">
                        {/* Stats Row (From PDF Requirements) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card p-5 border-l-4 border-l-[#4154f1] shadow-sm">
                                <h4 className="text-gray-500 text-xs font-bold uppercase mb-2">Attendance (This Month)</h4>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-2xl font-bold text-[#012970]">22 Days</div>
                                        <div className="text-xs text-green-600 font-medium">100% Present</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-400">Late</div>
                                        <div className="font-bold text-orange-500">0</div>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-5 border-l-4 border-l-[#ff771d] shadow-sm">
                                <h4 className="text-gray-500 text-xs font-bold uppercase mb-2">Leave Balance</h4>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-2xl font-bold text-[#012970]">12 Days</div>
                                        <div className="text-xs text-slate-500">Remaining / 24</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-400">Used</div>
                                        <div className="font-bold text-blue-600">12</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Narrative (Dynamic Data) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column: About & Bio */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="card">
                                    <h5 className="card-title text-base">About</h5>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        {employee.about || "No bio available."}
                                    </p>

                                    <h5 className="card-title text-base mt-2">What I love about my job</h5>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {employee.jobLove || "I love working here!"}
                                    </p>

                                    <h5 className="card-title text-base mt-4">My interests and hobbies</h5>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-1">
                                        {(employee.interests || []).map((interest, idx) => (
                                            <li key={idx}>{interest}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Column: Skills & Certifications */}
                            <div className="space-y-6">
                                <div className="card">
                                    <h5 className="card-title text-base">Skills</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {(employee.skills || []).map(skill => (
                                            <span key={skill} className="bg-blue-50 text-[#4154f1] text-xs font-semibold px-2.5 py-1 rounded border border-blue-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="card">
                                    <h5 className="card-title text-base">Certifications</h5>
                                    <ul className="space-y-3">
                                        {(employee.certifications || []).map((cert, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm">
                                                <div className="mt-1 min-w-[20px] text-green-500">
                                                    <Shield size={16} />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-700">{cert.name}</div>
                                                    <div className="text-xs text-gray-500">{cert.org}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full mt-4">
                            <h4 className="text-sm font-bold text-[#4154f1] border-b border-blue-100 pb-2 mb-4">Upcoming Shortcuts</h4>
                            <div className="flex gap-4">
                                <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded text-sm font-bold hover:bg-blue-100 transition-colors">Request Time Off</button>
                                <button className="bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm font-bold hover:bg-gray-100 transition-colors">View Payslips</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* RESUME TAB */}
                {activeTab === 'resume' && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#012970]">{employee.name.split(' ')[0]}_Resume.pdf</h4>
                                    <p className="text-xs text-gray-500">4.5 MB • Uploaded on {employee.joinDate}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-[#4154f1] transition-colors" title="View">
                                    <LayoutDashboard size={18} />
                                </button>
                                <button className="flex items-center gap-2 bg-[#4154f1] text-white px-4 py-2 rounded text-sm font-bold shadow hover:bg-blue-700 transition-colors">
                                    <Shield size={16} /> Download
                                </button>
                            </div>
                        </div>

                        {/* Mock PDF Viewer */}
                        <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 h-[400px] flex flex-col items-center justify-center text-gray-400">
                            <FileText size={48} className="mb-2 opacity-50" />
                            <p className="font-medium">Document Preview</p>
                            <span className="text-xs">Preview is not available in demo mode</span>
                        </div>
                    </div>
                )}

                {/* PRIVATE INFO TAB (Matches Wireframe fields) */}
                {activeTab === 'private' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        <div className="col-span-full mb-4">
                            <h4 className="text-sm font-bold text-[#4154f1] border-b border-blue-100 pb-2 mb-4">Personal Details</h4>
                        </div>
                        <Field label="Full Name" value={employee.name} />
                        <Field label="Date of Birth" value={employee.dob} />
                        <Field label="Gender" value={employee.gender} />
                        <Field label="Marital Status" value={employee.maritalStatus} />
                        <Field label="Nationality" value={employee.nationality} />

                        <div className="col-span-full mt-4 mb-4">
                            <h4 className="text-sm font-bold text-[#4154f1] border-b border-blue-100 pb-2 mb-4">Contact & Address</h4>
                        </div>
                        <Field label="Phone" value={employee.phone} />
                        <Field label="Email" value={employee.email} />
                        <Field label="Current Address" value={employee.address} />

                        <div className="col-span-full mt-4 mb-4">
                            <h4 className="text-sm font-bold text-[#4154f1] border-b border-blue-100 pb-2 mb-4">Bank Details</h4>
                        </div>
                        <Field label="Bank Name" value={employee.bankName} />
                        <Field label="Account Number" value={employee.accountNumber} />
                        <Field label="IFSC Code" value={employee.ifsc} />
                        <Field label="PAN Number" value={employee.pan} />
                    </div>
                )}

                {/* SALARY INFO TAB (Admin: Editable / Employee: View Only) */}
                {activeTab === 'salary' && (
                    <div className="animate-fade-in space-y-6">

                        {/* Wireframe Header: Month & Yearly Wage */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                            <div className="bg-[#f6f9ff] border border-blue-100 p-4 rounded-lg text-center">
                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Month Wage</div>
                                <div className="text-2xl font-bold text-[#012970]">₹{grossSalary.toLocaleString()}</div>
                            </div>
                            <div className="bg-[#f6f9ff] border border-blue-100 p-4 rounded-lg text-center">
                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Yearly Wage</div>
                                <div className="text-2xl font-bold text-[#012970]">₹{yearlyPackage.toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Admin Configuration Panel (Wireframe Logic: Define Structure) */}
                        {userRole === 'Admin' && (
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6">
                                <h5 className="text-sm font-bold text-[#012970] mb-3 flex items-center gap-2">
                                    <Wallet size={16} /> Salary Configuration
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Wage Type</label>
                                        <select className="w-full text-sm border-gray-300 rounded p-1.5 border bg-white">
                                            <option>Monthly</option>
                                            <option>Hourly</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Gross Salary (₹)</label>
                                        <input type="number" defaultValue={grossSalary} className="w-full text-sm border-gray-300 rounded p-1.5 border font-bold text-[#012970]" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Structure</label>
                                        <div className="text-xs text-gray-600 mt-2">Standard (Basic 50% + HRA 50%)</div>
                                    </div>
                                </div>
                                <div className="mt-3 text-[10px] text-blue-600 italic">
                                    * Updating Gross Salary will auto-calculate components below based on company policy.
                                </div>
                            </div>
                        )}

                        {/* Structure Table (Breakdown) */}
                        <div>
                            <h4 className="text-sm font-bold text-[#4154f1] mb-4">Salary Components</h4>
                            <div className="overflow-hidden border border-gray-200 rounded-lg">
                                <table className="w-full text-sm">
                                    <thead className="bg-[#f6f9ff] text-[#012970] border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Component</th>
                                            <th className="px-4 py-3 text-right">Formula/Type</th>
                                            <th className="px-4 py-3 text-right">Amount (₹)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Basic Salary</td>
                                            <td className="px-4 py-3 text-right text-gray-500 text-xs">Fixed Allocation</td>
                                            <td className="px-4 py-3 text-right font-mono">{employee.basicSalary.toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium">House Rent Allowance (HRA)</td>
                                            <td className="px-4 py-3 text-right text-gray-500 text-xs">provided to employees 50%...</td>
                                            <td className="px-4 py-3 text-right font-mono ">{employee.allowances?.hra.toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Standard Allowance</td>
                                            <td className="px-4 py-3 text-right text-gray-500 text-xs">Predetermined fixed amount</td>
                                            <td className="px-4 py-3 text-right font-mono">{employee.allowances?.standard.toLocaleString()}</td>
                                        </tr>
                                        {/* Mapped from 'Special' to 'Performance Bonus' for Wireframe Match */}
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Performance Bonus</td>
                                            <td className="px-4 py-3 text-right text-gray-500 text-xs">Variable amount paid during...</td>
                                            <td className="px-4 py-3 text-right font-mono">{employee.allowances?.special.toLocaleString()}</td>
                                        </tr>
                                        {/* Added Dummy LTA row for Wireframe Completeness */}
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Leave Travel Allowance</td>
                                            <td className="px-4 py-3 text-right text-gray-500 text-xs">Paid by company to cover...</td>
                                            <td className="px-4 py-3 text-right font-mono">{employee.allowances?.lta.toLocaleString()}</td>
                                        </tr>
                                        {/* Added Dummy Fixed row for Wireframe Completeness */}
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Fixed Allowance</td>
                                            <td className="px-4 py-3 text-right text-gray-500 text-xs">Fixed portion of wages...</td>
                                            <td className="px-4 py-3 text-right font-mono">{(2500).toLocaleString()}</td>
                                        </tr>

                                        <tr className="bg-red-50/50">
                                            <td className="px-4 py-3 font-medium text-red-700">Provident Fund (PF)</td>
                                            <td className="px-4 py-3 text-right text-red-500 text-xs">12% of Basic</td>
                                            <td className="px-4 py-3 text-right font-mono text-red-700">-{employee.deductions?.pf.toLocaleString()}</td>
                                        </tr>
                                        <tr className="bg-red-50/50">
                                            <td className="px-4 py-3 font-medium text-red-700">Professional Tax</td>
                                            <td className="px-4 py-3 text-right text-red-500 text-xs">State Act</td>
                                            <td className="px-4 py-3 text-right font-mono text-red-700">-{employee.deductions?.tax.toLocaleString()}</td>
                                        </tr>
                                        <tr className="bg-[#f6f9ff] font-bold text-[#012970]">
                                            <td className="px-4 py-3">Net Salary Payable</td>
                                            <td className="px-4 py-3 text-right"></td>
                                            <td className="px-4 py-3 text-right text-lg">₹{(netSalary + 2500).toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded border border-gray-100">
                                <div>
                                    <div className="text-xs text-slate-400 font-bold uppercase">Estimated Yearly CTC</div>
                                    <div className="text-lg font-bold text-green-600">₹{(yearlyPackage + (2500 * 12)).toLocaleString()}</div>
                                </div>
                                {userRole === 'Admin' && (
                                    <button className="bg-[#4154f1] text-white px-4 py-2 rounded text-sm font-bold shadow hover:bg-blue-700">
                                        Save Structure
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}            </div>

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
                <div className="space-y-6 max-w-md">
                    <div>
                        <h4 className="text-sm font-bold text-[#4154f1] mb-2">Change Password</h4>
                        <input type="password" placeholder="Current Password" className="w-full mb-2 p-2 border rounded text-sm" />
                        <input type="password" placeholder="New Password" className="w-full mb-2 p-2 border rounded text-sm" />
                        <input type="password" placeholder="Confirm Password" className="w-full mb-4 p-2 border rounded text-sm" />
                        <button className="bg-[#4154f1] text-white px-4 py-2 rounded text-sm">Update Password</button>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-bold text-[#4154f1] mb-2">Login Activity</h4>
                        <div className="text-xs text-gray-500">
                            <p className="flex justify-between mb-1"><span>Windows 10 • Chrome</span> <span>Today, 10:30 AM</span></p>
                            <p className="flex justify-between"><span>Android • Dayflow App</span> <span>Yesterday, 06:15 PM</span></p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
