import Button from '../../components/common/Button';
import Input from '../../components/forms/Input';
import Card from '../../components/common/Card';
import { toast } from 'react-toastify';

const Settings = () => {
    const handleSave = (e) => {
        e.preventDefault();
        toast.success('Settings updated successfully!');
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-800">Settings</h2>

            <Card title="Change Password">
                <form className="space-y-4 max-w-md" onSubmit={handleSave}>
                    <Input label="Current Password" type="password" placeholder="••••••••" />
                    <Input label="New Password" type="password" placeholder="••••••••" />
                    <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                    
                    <div className="pt-2">
                        <Button type="submit">Update Password</Button>
                    </div>
                </form>
            </Card>

            <Card title="Notifications">
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-700">Email Notifications</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-700">Desktop Notifications</span>
                        <input type="checkbox" className="toggle" />
                    </div>
                 </div>
            </Card>
        </div>
    );
};

export default Settings;
