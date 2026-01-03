import React from 'react';

/**
 * InputField Component
 * 
 * Purpose:
 * Renders a labeled input field with consistent styling and accessibility features.
 * 
 * Props:
 * - label: Text to display above the input.
 * - type: HTML input type (text, password, email, etc.).
 * - placeholder: Placeholder text.
 * - value: Current value of the input.
 * - onChange: Handler for value changes.
 * - name: Name attribute for the input.
 * - required: Whether the field is mandatory.
 * 
 * Why reusable:
 * Encapsulates the label and input structure, making forms cleaner and ensuring uniform styling.
 */
const InputField = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    required = false
}) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {/* Label section */}
            {label && (
                <label className="text-sm font-medium text-slate-300">
                    {label} {required && <span className="text-red-400">*</span>}
                </label>
            )}

            {/* Input element */}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="
          w-full 
          px-4 py-2.5 
          bg-slate-800 
          border border-slate-700 
          rounded-lg 
          text-white 
          placeholder-slate-500
          focus:border-indigo-500 
          focus:ring-1 
          focus:ring-indigo-500 
          focus:outline-none 
          transition-all 
          duration-200
        "
            />
        </div>
    );
};

export default InputField;
