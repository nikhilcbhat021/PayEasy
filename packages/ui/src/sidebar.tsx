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
        <div className='text-sm w-full flex pt-16'>
            <ul className='px-4 w-full
                    *:hover:bg-stone-300 *:hover:rounded *:active:bg-stone-400 *:hover:cursor-pointer
                '>
                {
                    sidebarChildren.map((child: SidebarElement) =>
                        <li key={child.key}>
                            <Link href={child.href}>
                                <div
                                    tabIndex={-1}
                                    // onClick={() => router.push(child.href)}
                                    className={`p-4 my-2 flex gap-4 font-semibold items-center ${child.href === path && `text-[#6a51d6]`}`}
                                >
                                    <div>{child.icon}</div>
                                    <div>{child.heading}</div>
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