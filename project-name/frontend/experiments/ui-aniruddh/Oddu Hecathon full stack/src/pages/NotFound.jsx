import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import Button from '../components/common/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
            <FiAlertCircle className="text-6xl text-slate-300 mb-4" />
            <h1 className="text-4xl font-bold text-slate-800 mb-2">404</h1>
            <p className="text-xl text-slate-600 mb-8">Page not found</p>
            <Link to="/">
                <Button variant="primary">Go to Dashboard</Button>
            </Link>
        </div>
    );
};

export default NotFound;
