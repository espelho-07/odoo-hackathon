import React from 'react';

const InputField = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    required = false,
    disabled = false
}) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    {label} {required && <span className="text-indigo-400">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`
          w-full 
          px-4 py-3
          bg-slate-50 dark:bg-slate-900 
          border border-slate-200 dark:border-slate-800 
          rounded-xl
          text-slate-900 dark:text-white 
          placeholder-slate-400
          transition-all duration-200
          ${disabled
                        ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800 border-transparent'
                        : 'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:border-slate-300 dark:hover:border-slate-700'
                    }
        `}
            />
        </div>
    );
};

export default InputField;
