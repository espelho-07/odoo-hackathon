import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/common/Card';
import { motion } from 'framer-motion';

const Reports = () => {
    const data = [
        { name: 'Jan', attendance: 90, leaves: 5 },
        { name: 'Feb', attendance: 85, leaves: 8 },
        { name: 'Mar', attendance: 92, leaves: 3 },
        { name: 'Apr', attendance: 88, leaves: 6 },
        { name: 'May', attendance: 95, leaves: 2 },
        { name: 'Jun', attendance: 89, leaves: 5 },
    ];

    const pieData = [
        { name: 'Engineering', value: 40, color: '#6366f1' },
        { name: 'Sales', value: 30, color: '#8b5cf6' },
        { name: 'Marketing', value: 20, color: '#ec4899' },
        { name: 'HR', value: 10, color: '#f43f5e' },
    ];

    return (
        <div className="space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                 <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
                 <p className="text-slate-500 mt-1">Deep dive into organization metrics.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card title="Attendance vs Leaves Trend" className="h-full">
                        <div className="h-80 w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} barGap={4}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                                    <Tooltip 
                                        cursor={{fill: '#f8fafc'}}
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="attendance" name="Attendance %" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="leaves" name="Leaves Taken" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </motion.div>

                 <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card title="Department Distribution" className="h-full">
                         <div className="h-80 w-full flex items-center justify-center mt-4 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-slate-800">100%</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Reports;
