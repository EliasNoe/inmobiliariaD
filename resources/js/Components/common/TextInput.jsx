import React, { forwardRef } from 'react';

const TextInput = forwardRef(({ type = 'text', className = '', ...props }, ref) => {
    return (
        <input
            {...props}
            type={type}
            className={`rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
            ref={ref}
        />
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;
