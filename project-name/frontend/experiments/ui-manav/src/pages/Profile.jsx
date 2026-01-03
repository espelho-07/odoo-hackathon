import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { currentUser } from '../data/dummyEmployees';
import { Mail, Phone, Briefcase, MapPin } from 'lucide-react';

/**
 * Profile Page
 * 
 * Purpose:
 * Detailed view of the logged-in user's profile.
 * Allows visual editing (mock).
 */
const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Banner */}
            <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-900 flex items-center justify-center text-3xl font-bold text-indigo-600 shadow-xl">
                            {currentUser.avatar}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{currentUser.name}</h1>
                            <p className="text-slate-200 opacity-90">{currentUser.role} • {currentUser.department}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-300">
                                <Mail size={18} className="text-indigo-400" />
                                <span className="text-sm truncate">{currentUser.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <Phone size={18} className="text-indigo-400" />
                                <span className="text-sm">{currentUser.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <Briefcase size={18} className="text-indigo-400" />
                                <span className="text-sm">Joined {new Date(currentUser.joinDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <MapPin size={18} className="text-indigo-400" />
                                <span className="text-sm">New York, USA</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Edit Form */}
                <div className="md:col-span-2">
                    <Card title="Edit Profile">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField label="Full Name" defaultValue={currentUser.name} />
                                <InputField label="Job Title" defaultValue={currentUser.role} />
                                <InputField label="Email" defaultValue={currentUser.email} type="email" />
                                <InputField label="Phone" defaultValue={currentUser.phone} />
                            </div>

                            <div className="pt-4 border-t border-slate-700 flex justify-end gap-3">
                                <Button variant="ghost">Cancel</Button>
                                <Button variant="primary">Save Changes</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
