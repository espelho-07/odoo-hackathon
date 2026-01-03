import clsx from 'clsx';
import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className={clsx("w-full", className)}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <input
        ref={ref}
        className={clsx(
          "w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all",
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
            : "border-slate-300 focus:border-primary-500 focus:ring-primary-100"
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
