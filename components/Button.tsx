import React, { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
    type: ButtonHTMLAttributes<HTMLInputElement>['type'];
    disabled?: boolean;
    onClick?: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
    type,
    onClick,
    disabled,
    children,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className='bg-green-800 text-gray-100 rounded px-4 py-2 my-2 hover:bg-green-700 focus:bg-green-700'
        >
            {children}
        </button>
    );
}

export default Button;
