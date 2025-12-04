import React, { forwardRef } from 'react';

const TextareaInput = forwardRef(({ className = '', ...props }, ref) => {
    return (
        <textarea
            {...props}
            className={`rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
            ref={ref}
        ></textarea>
    );
});

TextareaInput.displayName = 'TextareaInput';

export default TextareaInput;
