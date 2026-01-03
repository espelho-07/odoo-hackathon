import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Button from '../components/Button';
import SalaryCalculator from '../components/SalaryCalculator';
import { getCurrentUser, updateEmployee } from '../utils/storage';
import { Mail, Phone, MapPin, Briefcase, Camera, BadgeCheck, Building, Globe, CreditCard } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState(getCurrentUser());
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('private'); // resume, private, salary, security

    // Initialize form with user data + empty strings for new fields to avoid uncontrolled warning
    const [formData, setFormData] = useState({
        ...user,
        nationality: user.nationality || '',
        personalEmail: user.personalEmail || '',
        gender: user.gender || '',
        maritalStatus: user.maritalStatus || '',
        bankName: user.bankName || '',
        accountNumber: user.accountNumber || '',
        ifscCode: user.ifscCode || '',
        panNo: user.panNo || '',
        uanNo: user.uanNo || '',
        location: user.location || '',
        manager: user.manager || 'Not Assigned'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const updated = {
            ...user,
            ...formData
        };

        updateEmployee(updated);
        setUser(getCurrentUser());
        setIsEditing(false);
    };

    const TabButton = ({ id, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
        >
            {label}
        </button>
    );

    return (
        <PageLayout title="My Profile">
            {/* Top Profile Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Avatar Block */}
                    <div className="flex-shrink-0 relative">
                        <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl font-bold text-slate-600 dark:text-slate-300 border-4 border-slate-50 dark:border-slate-800 shadow-inner">
                            {user.avatar || user.name.charAt(0)}
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-1 right-1 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700">
                                <Camera size={16} />
                            </button>
                        )}
                    </div>

                    {/* Header Info Block */}
                    <div className="flex-grow w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                    {user.name}
                                    <BadgeCheck className="text-blue-500" size={24} />
                                </h1>
                                <p className="text-lg text-slate-500 font-medium mb-4">{user.role.toUpperCase()}</p>
                            </div>

                            {!isEditing ? (
                                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button variant="ghost" onClick={() => { setIsEditing(false); setFormData({ ...user }); }}>Cancel</Button>
                                    <Button onClick={handleSave}>Save Changes</Button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-1">
                                <label className="text-xs text-slate-400 font-semibold uppercase">Email</label>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Mail size={14} /> {user.email}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-400 font-semibold uppercase">Mobile</label>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Phone size={14} /> {formData.phone || 'N/A'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-400 font-semibold uppercase">Department</label>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Building size={14} /> {user.department || 'General'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-slate-400 font-semibold uppercase">Location</label>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <MapPin size={14} /> {formData.location || 'Remote'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto">
                <TabButton id="resume" label="Resume" />
                <TabButton id="private" label="Private Info" />
                <TabButton id="salary" label="Salary Info" />
                <TabButton id="security" label="Security" />
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'private' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
                        {/* Personal Data Column */}
                        <Card title="Personal Data">
                            <div className="space-y-6">
                                <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} disabled={!isEditing} />
                                <InputField label="Residing Address" name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} />
                                <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} disabled={!isEditing} />
                                <InputField label="Personal Email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} disabled={!isEditing} />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Gender" name="gender" value={formData.gender} onChange={handleChange} disabled={!isEditing} />
                                    <InputField label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} disabled={!isEditing} />
                                </div>
                                <InputField label="Date of Joining" value={user.joinDate} disabled={true} />
                            </div>
                        </Card>

                        {/* Bank Details Column */}
                        <Card title="Bank Details">
                            <div className="space-y-6">
                                <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} disabled={!isEditing} />
                                <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} disabled={!isEditing} />
                                <InputField label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} disabled={!isEditing} />
                                <InputField label="PAN No" name="panNo" value={formData.panNo} onChange={handleChange} disabled={!isEditing} />
                                <InputField label="UAN No" name="uanNo" value={formData.uanNo} onChange={handleChange} disabled={!isEditing} />
                                <InputField label="Emp Code" value={user.id} disabled={true} />
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'salary' && (
                    user.role === 'admin' ? (
                        <Card title="Salary Information">
                            {/* Calculation Logic Wrapper */}
                            <SalaryCalculator
                                wage={formData.salary}
                                isEditing={isEditing}
                                onChange={(val) => setFormData({ ...formData, salary: val })}
                                formData={formData}
                                onFormChange={handleChange}
                            />
                        </Card>
                    ) : (
                        <Card>
                            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                                <BadgeCheck size={40} className="mx-auto mb-2 opacity-50" />
                                <p>Salary information is visible to Administrators only.</p>
                            </div>
                        </Card>
                    )
                )}

                {activeTab === 'resume' && (
                    <Card>
                        <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                            <Briefcase size={40} className="mx-auto mb-2 opacity-50" />
                            <p>Resume not uploaded.</p>
                        </div>
                    </Card>
                )}
                {activeTab === 'security' && (
                    <Card title="Account Security">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300">Password</p>
                                    <p className="text-sm text-slate-500">Last changed 30 days ago</p>
                                </div>
                                <Button variant="secondary" className="text-sm">Change Password</Button>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </PageLayout>
    );
};

export default Profile;
