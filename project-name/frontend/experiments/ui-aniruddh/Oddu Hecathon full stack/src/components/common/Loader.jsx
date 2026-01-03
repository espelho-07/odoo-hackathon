import { ImSpinner2 } from 'react-icons/im';

const Loader = ({ fullScreen = false, size = 'md', className }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <ImSpinner2 className="animate-spin text-primary-600 text-4xl" />
            </div>
        );
    }
    return <ImSpinner2 className={`animate-spin text-primary-600 ${className}`} size={size === 'lg' ? 32 : 20} />;
};

export default Loader;
