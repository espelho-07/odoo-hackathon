import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import MainLayout from '../components/layout/MainLayout';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import EmployeeDashboard from '../pages/dashboard/EmployeeDashboard';
import EmployeeList from '../pages/employees/EmployeeList';
import EmployeeProfile from '../pages/employees/EmployeeProfile';
import Attendance from '../pages/attendance/Attendance';
import AdminAttendance from '../pages/attendance/AdminAttendance';
import Leave from '../pages/leave/Leave';
import AdminLeave from '../pages/leave/AdminLeave';
import Payroll from '../pages/payroll/Payroll';
import AdminPayroll from '../pages/payroll/AdminPayroll';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';
import Unauthorized from '../pages/Unauthorized';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            <Route path="/" element={
                 <ProtectedRoute allowedRoles={['admin', 'employee']}>
                    <MainLayout />
                </ProtectedRoute>
            }>
                {/* Dashboard Redirect */}
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={
                     user?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />
                } />

                {/* Employee Management (Admin Only) */}
                <Route path="employees" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <EmployeeList />
                    </ProtectedRoute>
                } />
                <Route path="employees/:id" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <EmployeeProfile />
                    </ProtectedRoute>
                } />

                {/* Attendance */}
                <Route path="attendance" element={
                     user?.role === 'admin' ? <AdminAttendance /> : <Attendance />
                } />

                {/* Leave */}
                <Route path="leaves" element={
                     user?.role === 'admin' ? <AdminLeave /> : <Leave />
                } />

                {/* Payroll */}
                 <Route path="payroll" element={
                     user?.role === 'admin' ? <AdminPayroll /> : <Payroll />
                } />

                {/* Reports */}
                <Route path="reports" element={
                    <ProtectedRoute allowedRoles={['admin', 'employee']}>
                        <Reports />
                    </ProtectedRoute>
                } />

                 {/* Settings */}
                 <Route path="settings" element={<Settings />} />

            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
