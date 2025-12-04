import React from 'react';

export default function InputLabel({ value, htmlFor, className = '', required = false, ...props }) {
    return (
        <label htmlFor={htmlFor} {...props} className={`block font-medium text-sm text-gray-700 ${className}`}>
            {value}
            {required && <span className="ml-1 text-red-500">*</span>}
        </label>
    );
}
