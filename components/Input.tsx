import React, { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

interface InputProps {
    type: HTMLInputTypeAttribute;
    value: string;
    required: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>,
}

export const Input: React.FC<InputProps> = ({
    type,
    value,
    required,
    onChange,
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className='border rounded px-3 py-1 w-80'
        />
    );
}