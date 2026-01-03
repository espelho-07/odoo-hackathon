import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // MOCK LOGIN FOR DEMO
        console.log("Mock login triggered for:", email);

        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: '1',
                    name: email.includes('admin') ? 'Admin User' : 'John Doe',
                    email,
                    role: email.includes('admin') ? 'Admin' : 'Employee', // Capitalized Role to match existing app
                    avatar: `https://ui-avatars.com/api/?name=${email.includes('admin') ? 'Admin+User' : 'John+Doe'}&background=random`
                };
                const mockToken = 'mock-jwt-token-' + Date.now();

                localStorage.setItem('token', mockToken);
                localStorage.setItem('user', JSON.stringify(mockUser));
                setUser(mockUser);
                resolve(mockUser);
            }, 800);
        });
    };

    const register = async (userData) => {
        // MOCK REGISTER FOR DEMO
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: 'Registration successful' });
            }, 800);
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/'; // Redirect to login
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
