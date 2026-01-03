const API_URL = 'http://localhost:5000/api';

/**
 * Helper to handle fetch requests with basic error handling
 */
const request = async (endpoint, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API Error');
        }

        return data; // Expecting { status: 'success', data: ... }
    } catch (error) {
        console.error(`API Request Failed: ${endpoint}`, error);
        throw error;
    }
};

const api = {
    // Auth
    login: (email, password) => request('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    }),

    // Employees
    getEmployees: () => request('/employees'),
    addEmployee: (employeeData) => request('/employees', {
        method: 'POST',
        body: JSON.stringify(employeeData)
    }),
    deleteEmployee: (id) => request(`/employees/${id}`, {
        method: 'DELETE'
    }),

    // Attendance
    getAttendance: (userId, date) => {
        const params = new URLSearchParams();
        if (userId) params.append('userId', userId);
        if (date) params.append('date', date);
        return request(`/attendance?${params.toString()}`);
    },
    checkIn: (userId) => request('/attendance/checkin', {
        method: 'POST',
        body: JSON.stringify({ userId })
    }),
    checkOut: (userId) => request('/attendance/checkout', {
        method: 'POST',
        body: JSON.stringify({ userId })
    }),

    // Leaves
    getLeaves: (userId, status) => {
        const params = new URLSearchParams();
        if (userId) params.append('userId', userId);
        if (status) params.append('status', status);
        return request(`/leaves?${params.toString()}`);
    },
    applyLeave: (leaveData) => request('/leaves', {
        method: 'POST',
        body: JSON.stringify(leaveData)
    }),
    updateLeaveStatus: (id, status) => request(`/leaves/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    }),

    // Stats
    getStats: () => request('/stats'),
};

export default api;
