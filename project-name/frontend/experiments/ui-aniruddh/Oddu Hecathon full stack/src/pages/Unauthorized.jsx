import { Link } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import Button from '../components/common/Button';

const Unauthorized = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
            <div className="bg-red-100 p-4 rounded-full mb-4">
                <FiLock className="text-4xl text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h1>
            <p className="text-slate-600 mb-8 max-w-md">
                You do not have permission to access this page. Please contact your administrator if you believe this is an error.
            </p>
            <Link to="/">
                <Button variant="secondary">Back to Home</Button>
            </Link>
        </div>
    );
};

export default Unauthorized;
