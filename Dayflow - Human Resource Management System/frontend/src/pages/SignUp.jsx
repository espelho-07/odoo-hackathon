import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { activateEmployee } from '../utils/storage';
import { Upload, Eye, EyeOff, Building2, UserCheck, ShieldCheck } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = activateEmployee(formData);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-neutral-800 relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/20 text-purple-400">
                        <UserCheck size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Activate Account</h2>
                    <p className="text-neutral-400 mt-2 text-sm">Enter your Employee ID to verify identity</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-start gap-3">
                        <ShieldCheck className="shrink-0 mt-0.5" size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Employee ID</label>
                        <input
                            type="text"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3.5 px-4 text-white placeholder-neutral-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                            placeholder="e.g. EMP123456"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3.5 px-4 text-white placeholder-neutral-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                            placeholder="name@company.com"
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Set Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3.5 px-4 text-white placeholder-neutral-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                                placeholder="Create a strong password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-[38px] text-neutral-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl py-3.5 px-4 text-white placeholder-neutral-600 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all outline-none"
                                placeholder="Confirm password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-[14px] text-neutral-500 hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-4 !bg-purple-600 hover:!bg-purple-500 text-white font-bold shadow-lg shadow-purple-900/20 mt-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Verify & Activate
                    </Button>
                </form>

                <div className="mt-8 text-center text-neutral-500 text-sm">
                    Return to <Link to="/" className="text-purple-400 hover:underline font-medium">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
