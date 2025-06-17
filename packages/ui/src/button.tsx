"use client";

import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "submit" | "button" | "reset";
    category?: "success" | "failure" | "info" | "dark";
    size?: "contained" | "full-width";
    disabled?: boolean
}

export const Button = ({ children, className, onClick, category="dark", type="button", size="contained", disabled=false }: ButtonProps) => {
    // console.log(appName || "Nothing");
    const btn_theme_styles = {
        // colors
        'success': `bg-green-700 hover:bg-green-600 
                    disabled:bg-green-200 disabled:text-green-600
                    text-white`,
        'failure': `bg-red-700 hover:bg-red-600 text-white
                    disabled:bg-red-200 disabled:text-red-500
                    text-white`,
        'info': `bg-sky-400 hover:bg-sky-300 text-black`,
        'dark': `bg-blue-950 hover:bg-blue-900 
                    disabled:bg-blue-200 disabled:hover:bg-blue-200 disabled:text-gray-500
                    text-white`,

        // width
        'contained': `w-fit px-4 py-2`,
        'full-width': `w-full p-2`,

        // btn-size , text-size
        // ...
    }


    return (
        <button
            type={type}
            className={`${!disabled && 'cursor-pointer'} rounded-md text-sm
                ${size && btn_theme_styles[size]} 
                ${category && btn_theme_styles[category]} 
                ${className}
            `}
            onClick={onClick}        
            disabled={disabled}
        >
            {children}
        </button>
    );
};
