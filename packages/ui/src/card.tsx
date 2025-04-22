import { type JSX } from "react";

export function Card({
  className,
  labelStyles,
  children,
  no_padding=false,
  title_center=false,
  label,
}: {
  className?: string;
  label?: string;
  labelStyles?: string;
  no_padding?: boolean;
  title_center?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className={`h-full w-full ${!no_padding && 'p-4 px-4.5'} rounded-md flex flex-col items-left bg-stone-100
        divide-y divide-gray-300 *:w-full
        ${className}`}
    >
        { label && 
            <h1 className={`
                    ${labelStyles ? labelStyles : 'text-xl mb-2 pb-2'}
                    ${title_center && 'text-center'}
                `}
            >
                {label}
            </h1> 
        }
        { children }
    </div>
  );
}
