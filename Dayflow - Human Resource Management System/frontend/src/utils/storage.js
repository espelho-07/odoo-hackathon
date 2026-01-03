import { INITIAL_DATA } from '../data/dummyData';

/**
 * Storage Utility
 * 
 * Purpose:
 * Centralized wrapper around localStorage to simulate a database.
 * Handles reading/writing users, sessions, and records.
 */

const KEYS = {
    USERS: 'dayflow_users',
    SESSION: 'dayflow_session',
    ATTENDANCE: 'dayflow_attendance',
    LEAVES: 'dayflow_leaves'
};

// --- Initialization ---

export const initStorage = () => {
    if (!localStorage.getItem(KEYS.USERS)) {
        localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_DATA.users));
    }
    if (!localStorage.getItem(KEYS.ATTENDANCE)) {
        localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(INITIAL_DATA.attendance));
    }
    if (!localStorage.getItem(KEYS.LEAVES)) {
        localStorage.setItem(KEYS.LEAVES, JSON.stringify(INITIAL_DATA.leaves));
    }
};

// --- Authentication ---

export const loginUser = (email, password) => {
    initStorage();
    const users = JSON.parse(localStorage.getItem(KEYS.USERS));
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Save session (exclude password)
        const { password: _password, ...safeUser } = user;
        localStorage.setItem(KEYS.SESSION, JSON.stringify(safeUser));
        return { success: true, user: safeUser };
    }
    return { success: false, message: 'Invalid credentials' };
};

export const registerUser = (userData) => {
    initStorage();
    const users = JSON.parse(localStorage.getItem(KEYS.USERS));

    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'Email already exists' };
    }

    const newUser = {
        ...userData,
        id: `admin${Date.now()}`, // Admin ID for first user
        role: 'admin', // First user is always Admin
        isAdminMetadata: true, // Flag to identify company creator
        companyName: userData.companyName,
        companyLogo: userData.companyLogo,
        salary: 0,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: userData.name.charAt(0).toUpperCase()
    };

    users.push(newUser);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));

    // Auto login after signup
    const { password: _password, ...safeUser } = newUser;
    localStorage.setItem(KEYS.SESSION, JSON.stringify(safeUser));

    return { success: true, user: safeUser };
};

export const logoutUser = () => {
    localStorage.removeItem(KEYS.SESSION);
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(KEYS.SESSION));
};

// --- Data Access ---

export const getData = (key) => {
    initStorage();
    return JSON.parse(localStorage.getItem(key)) || [];
};

export const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// --- Specific Helpers ---

export const updateEmployee = (updatedUser) => {
    const users = getData(KEYS.USERS);
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        setData(KEYS.USERS, users);

        // Update session if editing self
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.id === updatedUser.id) {
            localStorage.setItem(KEYS.SESSION, JSON.stringify({ ...currentUser, ...updatedUser }));
        }
        return true;
    }
    return false;
};

// --- NEW CRUD Helpers ---

export const addEmployee = (userData) => {
    initStorage();
    const users = getData(KEYS.USERS);

    // Check for duplicate email
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'Email already exists' };
    }

    const newUser = {
        ...userData,
        id: `emp${Date.now()}`,
        // Set defaults if missing
        role: userData.role || 'employee',
        salary: Number(userData.salary) || 0,
        joinDate: new Date().toISOString().split('T')[0],
        avatar: (userData.name || 'U').charAt(0).toUpperCase(),
        password: '123' // Default password for new users
    };

    users.push(newUser);
    setData(KEYS.USERS, users);
    return { success: true, user: newUser };
};

export const deleteEmployee = (userId) => {
    let users = getData(KEYS.USERS);
    const initialLength = users.length;
    users = users.filter(u => u.id !== userId);

    if (users.length < initialLength) {
        setData(KEYS.USERS, users);
        return true;
    }
    return false;
};

export const activateEmployee = (activationData) => {
    initStorage();
    const users = getData(KEYS.USERS);

    // Find employee by ID
    const index = users.findIndex(u => u.id === activationData.employeeId);

    if (index === -1) {
        return { success: false, message: 'Invalid Employee ID' };
    }

    const employee = users[index];

    // Verify Email matches record
    if (employee.email !== activationData.email) {
        return { success: false, message: 'Email does not match our records for this ID' };
    }

    // Update Password and Activate
    users[index] = {
        ...employee,
        password: activationData.password,
        isActive: true // Mark as activated if needed
    };

    setData(KEYS.USERS, users);

    // Auto login
    const { password: _password, ...safeUser } = users[index];
    localStorage.setItem(KEYS.SESSION, JSON.stringify(safeUser));

    return { success: true, user: safeUser };
};
