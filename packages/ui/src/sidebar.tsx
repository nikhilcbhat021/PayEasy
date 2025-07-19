'use client'

import { SidebarElement } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = ({ sidebarChildren }: {
    sidebarChildren: Array<SidebarElement>
}) => {

    const router = useRouter();
    const path = usePathname();
    // alert();
    console.log(path);
    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     console.log('re-rendered');
    //     setMounted(true);
    // }, [])

    // if (!mounted)
    //     return <></>

    return (
        <div 
            className='sticky top-15 left-0 text-sm w-full flex pt-16'
            // className='sticky top-15 text-sm w-full flex pt-16'
        >
            <ul className='px-2 md:px-4 w-full
                    *:hover:bg-stone-300 *:hover:rounded md:*:active:bg-stone-400 *:hover:cursor-pointer
                '>
                {
                    sidebarChildren.map((child: SidebarElement) =>
                        <li key={child.key}>
                            <Link href={child.href}>
                                <div
                                    tabIndex={-1}
                                    // onClick={() => router.push(child.href)}
                                    className={`p-2 py-3 my-3 md:p-4 md:my-3 md:bg-transparent flex gap-4 font-semibold justify-center md:justify-start items-center ${child.href === path && `text-[#6a51d6] border-2 rounded-xl md:rounded-none bg-stone-300 md:border-0`}`}
                                >
                                    <div>{child.icon}</div>
                                    <div className='hidden md:block'>{child.heading}</div>
                                </div>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}


export default Sidebar