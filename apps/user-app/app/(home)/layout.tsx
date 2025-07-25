import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SidebarClient from "@/components/SidebarClient";
import "@repo/ui/styles.css"

export default async function Layout ({children}: Readonly<{children: ReactNode}>) {
    const session = await auth();

    console.log('Inside /(home)/layout.tsx');
    console.log(session?.user)
    
    if (!session?.user)
        redirect('/');

    return <main className="h-full flex">
        <SidebarClient />
        <div className="flex-1 h-full min-h-screen p-8 border-l-1 border-stone-400">
            {children}
        </div>
    </main>
}