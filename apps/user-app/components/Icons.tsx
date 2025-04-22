export type IconPropsType = {
    strokeWidth?: number
}

export const PersonIcon = ({strokeWidth = 2}: IconPropsType) => { return <svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="text-amber-700 lucide lucide-user-round-search-icon lucide-user-round-search">
        <circle cx="10" cy="8" r="5"/>
        <path d="M2 21a8 8 0 0 1 10.434-7.62"/>
        <circle cx="18" cy="18" r="3"/>
        <path d="m22 22-1.9-1.9"/>
    </svg>
}


export const HomeIcon = ({strokeWidth = 2}: IconPropsType) => { return <svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="text-sky-600  lucide size-5 lucide-house-icon lucide-house">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
}

export const WalletTopupIcon = ({strokeWidth = 2}: IconPropsType) => (<svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className=" text-rose-800 lucide size-5 lucide-wallet-icon lucide-wallet">
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
    </svg>
)

export const TransferIcon = ({strokeWidth = 2}: IconPropsType) => (<svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="lucide size-5 lucide-arrow-left-right-icon lucide-arrow-left-right">
        <path d="M8 3 4 7l4 4"/>
        <path d="M4 7h16"/>
        <path d="m16 21 4-4-4-4"/>
        <path d="M20 17H4"/>
    </svg>
)

export const TransactionsIcon = ({strokeWidth = 2}: IconPropsType) => (<svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="text-[#FF6600] lucide size-5 lucide-history-icon lucide-history">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
        <path d="M12 7v5l4 2"/>
    </svg>
)

export const Incoming = ({strokeWidth = 2}: IconPropsType) => (<svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 lucide lucide-arrow-down-left-icon lucide-arrow-down-left">
        <path d="M17 7 7 17"/>
        <path d="M17 17H7V7"/>
    </svg>
)



export const Outgoing = ({strokeWidth = 2}: IconPropsType) => (<svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 lucide lucide-arrow-up-right-icon lucide-arrow-up-right">
        <path d="M7 7h10v10"/>
        <path d="M7 17 17 7"/>
    </svg>
)