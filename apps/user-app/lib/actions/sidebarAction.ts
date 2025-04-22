'use server'
import { redirect } from "next/navigation"

export const sidebarClick = async (href:string) => {
    redirect(href);
}
