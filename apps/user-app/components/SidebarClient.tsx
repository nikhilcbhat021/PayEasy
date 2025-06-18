'use client'

import { HomeIcon, PersonIcon, TransactionsIcon, TransferIcon, WalletTopupIcon } from "@/components/Icons";
import { SidebarElement } from "@/lib/types";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@repo/ui/sidebar"), {ssr: false})
// import Sidebar from "@repo/ui/sidebar";


/* -- Constants -- */
const strokeWidth = 2;
const sidebar_buttons:Array<SidebarElement> = [
    {
        key: "home",
        icon: <HomeIcon strokeWidth={strokeWidth} />,
        heading: "Home",
        href: '/home'
    }, {
        key: "wallet_topup",
        icon: <WalletTopupIcon strokeWidth={strokeWidth} />,
        heading: "Wallet Topup",
        href: '/topup'
    }, {
        key: "transfer",
        icon: <PersonIcon strokeWidth={strokeWidth} />,
        heading: "Send Money",
        href: '/transfer'
    }, {
        key: "transactions",
        icon: <TransactionsIcon strokeWidth={strokeWidth} />,
        heading: "Transactions",
        href: '/transactions'
    }, 
]
/* -- Constants -- */



const SidebarClient = () => {

    return <nav className="w-fit md:w-1/4 lg:w-1/5 border-r-1 border-stone-400">
        <Sidebar sidebarChildren={sidebar_buttons}/>
    </nav>

    //  return <nav className="relative w-[60%] md:w-1/4 lg:w-1/5 border-r-1 border-stone-400">
    //     <section className="fixed top-0 left-0 ">
    //         <Sidebar sidebarChildren={sidebar_buttons}/>
    //     </section>
    // </nav>
}

export default SidebarClient;