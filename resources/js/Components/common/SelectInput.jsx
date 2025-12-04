import React, { forwardRef } from 'react';

const SelectInput = forwardRef(({ children, className = '', ...props }, ref) => {
    return (
        <select
            {...props}
            className={`rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
            ref={ref}
        >
            {children}
        </select>
    );
});

SelectInput.displayName = 'SelectInput';

export default SelectInput;
