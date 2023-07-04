import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
    type: ButtonHTMLAttributes<HTMLInputElement>['type'];
    disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    disabled,
    children,
}) => {
    return (
        <button
            disabled={disabled}
            type={type}
            className='bg-green-800 text-gray-100 rounded px-4 py-2 my-2 hover:bg-green-700 focus:bg-green-700'
        >
            {children}
        </button>
    );
}

export default Button;
