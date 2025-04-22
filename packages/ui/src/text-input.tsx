import React, { HTMLInputTypeAttribute } from 'react'

type TextInputType = {
    placeholder: string,
    type?: HTMLInputTypeAttribute
    required?: boolean,
    className?: string,
    name?: string,
    id?: string,
    label?: string,
    fit?: true | false,
}

export const TextInput = ({ placeholder, className, name, id, type = "text", required = true, fit, label }: TextInputType) => {
    return (
        <div>
            {label && <h2 className='font-semibold text-sm'>{label}</h2>}
            <input type={type} required={required} placeholder={placeholder} name={name} id={id} min={1}
                className={`border border-gray-300 bg-stone-50 p-2 my-1 text-xs rounded 
                    [web]
                    focus:ring-blue-500 focus:border-blue-500
                    ${fit ? 'w-fit' : 'w-full'}
                    ${className}
                `}
            />
        </div>
    )
}
