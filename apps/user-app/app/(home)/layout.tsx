import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SidebarClient from "../SidebarClient";

export default async function Layout ({children}: Readonly<{children: ReactNode}>) {
    const session = await auth();

    if (!session?.user)
        redirect('/');

    return <main id="main_layout" className="h-full flex ">
        <SidebarClient />
        <div className="flex-1 h-full p-8 ">
            {children}
        </div>
    </main>
}