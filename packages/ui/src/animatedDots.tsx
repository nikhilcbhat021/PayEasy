'use client'

import { useEffect, useState } from "react";


const AnimateDots = ({dotColor="black"}:{dotColor?:String}) => {

    const [dots, setDots] = useState(3);
    const bgColor = `bg-${dotColor} `;
    console.log(bgColor);

    useEffect(() => {
        const intv = setInterval(() => {
            setDots(d => {
                const updated = d === 3 ? 1 : d+1;  // by default have 3 animating dots...
                // console.log(updated);
                return updated;
            })
        }, 500);

        return () => {
            clearInterval(intv);
        }
    }, [])


    return <span className={`box-border self-end w-12 pb-1 pl-1`}>
        <div className="flex w-full justify-start items-center">
            <div className="flex space-x-2">
                {
                    Array.from({length: dots}).map((_, idx) => {
                        const delay__tw = `[animation-delay:-${((idx+3)%3)*0.5}]`;
                        // console.log(idx);
                        return <span key={idx} className={`w-1.5 h-1.5 bg-black rounded-full animate-bounce ${delay__tw} ${bgColor}`} />
                    })
                }
            </div>
        </div>
    </span>
}

export const AlternateAnimation = () => {
    return <>
        <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.00s]" />
    </>
}

export default AnimateDots;