import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({children}: {children: ReactNode}) {
    const session = await auth();

    if (session?.user)
        redirect('/');

    return <main className="w-full h-full flex items-center justify-center ">
        {children}
    </main>
}