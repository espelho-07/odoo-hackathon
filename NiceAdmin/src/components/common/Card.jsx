import clsx from 'clsx';
import { motion } from 'framer-motion';

const Card = ({ title, action, children, className, noPadding = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={clsx(
                "bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden",
                className
            )}
        >
            {(title || action) && (
                <div className="px-6 py-5 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800">
                    {title && <h3 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className={clsx(noPadding ? "p-0" : "p-6")}>
                {children}
            </div>
        </motion.div>
    );
};

export default Card;
