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

    const defaultClassNames = `h-full w-full ${!no_padding && 'p-4 px-4.5'} rounded-md flex flex-col items-left bg-stone-100 divide-y divide-gray-300 *:w-full`
    const formattedClassname = classNamesFormatting(className, defaultClassNames)

  return (
    <div
      className={formattedClassname}
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

function classNamesFormatting (className:string|undefined, defaultClassNames:string) {
    if (!className)
        return defaultClassNames;


    const _className = ` ${className} `;
    console.log("classlist from args - "+_className);

    const updatedDefaultClasses = defaultClassNames.split(' ').filter((_class) => {
        if (_class.trim()) {
            if (_className?.includes(` ${_class.split('-')[0]}-`)) {
                return false;
            }
            return true;
        }
        return false;
    })

    const finalClass = updatedDefaultClasses.join(' ').concat(_className);
    console.log("final list - "+finalClass);


    return finalClass;
}