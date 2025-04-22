'use client'
import { BaseType } from "@/lib/types"

export const Select = ({ 
    children,
    options,
    className,
    label,
    name,
    id,
    fit
}: { 
    children?: React.ReactNode,
    options?: Array<BaseType>,
    className?: string,
    label?: string,
    name?: string,
    id?: string,
    fit?: boolean
}) => {
    return (
        <div>
            { label && <h2 className='font-semibold text-sm'>Bank</h2> }
            <select name={name} id={id} className={`border border-gray-300 bg-stone-50 p-2.5 my-1 text-xs rounded 
                text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block
                ${fit ? 'w-fit' : 'w-full'}
                ${className}
            `} >
                {
                    options?.map(opt => <option className="p-0 leading-none m-0" key={opt.key} value={opt.value}>
                        {opt.key}
                    </option>)

                }
            </select>
            {children}
        </div>
    )
}