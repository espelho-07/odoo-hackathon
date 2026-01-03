import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { registerUser } from '../utils/storage';
import { Upload, Eye, EyeOff, Building2 } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        companyLogo: null // Simulation
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Fake upload - store name or base64 if needed (just name for now)
            setFormData({ ...formData, companyLogo: file.name });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = registerUser(formData);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-2xl bg-neutral-900/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-neutral-800 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Sign Up Page</h2>
                    <p className="text-neutral-400 mt-2">Register your Organization</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Name & Logo */}
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Company Name</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-800 border-none rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-neutral-500 focus:ring-2 focus:ring-purple-600 transition-all"
                                    placeholder="Acme Corp"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <input
                                type="file"
                                id="logo-upload"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <label
                                htmlFor="logo-upload"
                                className="h-[52px] px-6 bg-neutral-800 hover:bg-neutral-700 rounded-xl flex items-center gap-2 cursor-pointer text-neutral-300 transition-colors border border-transparent hover:border-neutral-600"
                            >
                                <Upload size={20} />
                                <span className="hidden sm:inline">Upload Logo</span>
                            </label>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-neutral-800 border-none rounded-xl py-3.5 px-4 text-white placeholder-neutral-500 focus:ring-2 focus:ring-purple-600 transition-all"
                                placeholder="Admin Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-neutral-800 border-none rounded-xl py-3.5 px-4 text-white placeholder-neutral-500 focus:ring-2 focus:ring-purple-600 transition-all"
                                placeholder="admin@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-neutral-800 border-none rounded-xl py-3.5 px-4 text-white placeholder-neutral-500 focus:ring-2 focus:ring-purple-600 transition-all"
                            placeholder="+1 (555) 000-0000"
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-neutral-800 border-none rounded-xl py-3.5 px-4 text-white placeholder-neutral-500 focus:ring-2 focus:ring-purple-600 transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-[42px] text-neutral-500 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-neutral-400 mb-2">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full bg-neutral-800 border-none rounded-xl py-3.5 px-4 text-white placeholder-neutral-500 focus:ring-2 focus:ring-purple-600 transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-[42px] text-neutral-500 hover:text-white"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-4 !bg-purple-600 hover:!bg-purple-500 text-lg font-semibold shadow-lg shadow-purple-900/20 mt-4 rounded-xl">
                        Sign Up
                    </Button>
                </form>

                <div className="mt-8 text-center text-neutral-500 text-sm">
                    Already have an account? <Link to="/" className="text-white hover:underline font-medium">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
