import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await login(e.target.email.value, e.target.password.value);
        if (mounted.current) {
             // Force full reload to ensure clean state and avoid router race conditions
             window.location.href = '/dashboard';
        }
    } catch (err) {
        console.error(err);
        if (mounted.current) setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side - Image/Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
        <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Office"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative z-10 text-white p-12 max-w-lg">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30">
                     <span className="text-3xl font-bold">D</span>
                </div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">Every Workday, <br/>Perfectly Aligned.</h1>
                <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                    Streamline your HR operations with Dayflow. Manage attendance, leaves, payroll, and more in one unified platform.
                </p>
                
                <div className="space-y-4">
                    {['Real-time Attendance Tracking', 'Seamless Payroll Processing', 'Advanced HR Analytics'].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div className="p-1 bg-green-400/20 rounded-full text-green-300">
                                <FiCheck size={16} />
                            </div>
                            <span className="text-lg text-indigo-50">{feature}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md"
        >
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back!</h2>
                <p className="text-slate-500">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input 
                        name="email" 
                        type="email" 
                        required 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-medium" 
                        placeholder="admin@dayflow.com" 
                    />
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                         <label className="block text-sm font-medium text-slate-700">Password</label>
                         <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                    </div>
                    <input 
                        name="password" 
                        type="password" 
                        required 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-medium" 
                        placeholder="••••••••" 
                    />
                </div>
                
                <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full shadow-lg shadow-indigo-500/30" 
                    loading={loading}
                >
                    Sign In <FiArrowRight className="ml-2" />
                </Button>
            </form>

            <p className="mt-8 text-center text-slate-500">
                Don't have an account? <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Create an account</Link>
            </p>
            
            <div className="mt-10 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                 <p className="text-xs text-indigo-800 text-center font-medium">✨ Pro Tip: Use <code className="bg-white px-1 py-0.5 rounded border border-indigo-200">admin@dayflow.com</code> for Admin access</p>
            </div>
        </motion.div>
      </div>
    </div>
  );
};
export default Login;
