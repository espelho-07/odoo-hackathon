import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import Button from '../../components/common/Button';
import Input from '../../components/forms/Input';
import Card from '../../components/common/Card';

const EmployeeProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <FiArrowLeft size={24} className="text-slate-600" />
                </button>
                <h2 className="text-2xl font-bold text-slate-800">
                    {isNew ? 'Add New Employee' : 'Employee Profile'}
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Photo & Basic Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="text-center">
                        <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-slate-400 font-bold">
                            U
                        </div>
                        <Button variant="secondary" size="sm" className="mb-4">Change Photo</Button>
                        <h3 className="text-xl font-bold text-slate-800">John Doe</h3>
                        <p className="text-slate-500">Senior Engineer</p>
                        <div className="mt-4 flex justify-center gap-2">
                             <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                        </div>
                    </Card>
                </div>

                {/* Right Column - Form Details */}
                <div className="lg:col-span-2">
                    <Card title="Personal & Job Details">
                        <form className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="First Name" defaultValue="John" />
                                <Input label="Last Name" defaultValue="Doe" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="Email" type="email" defaultValue="john@dayflow.com" />
                                <Input label="Phone" defaultValue="+1 234 567 890" />
                            </div>
                            
                            <hr className="border-slate-100 my-4" />
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="Employee ID" defaultValue="EMP-001" disabled={!isNew} />
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Department</label>
                                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white">
                                        <option>Engineering</option>
                                        <option>HR</option>
                                        <option>Sales</option>
                                    </select>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Designation</label>
                                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white">
                                        <option>Senior Engineer</option>
                                        <option>Product Manager</option>
                                        <option>Designer</option>
                                    </select>
                                </div>
                                 <Input label="Joining Date" type="date" defaultValue="2023-01-15" />
                            </div>

                             <div className="pt-4 flex justify-end gap-3">
                                <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                                <Button type="submit">
                                    <FiSave className="mr-2" /> Save Changes
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
