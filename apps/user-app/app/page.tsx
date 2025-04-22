import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import Appbar from "@repo/ui/appbar";
import { signOut, signIn } from "next-auth/react";
import { auth } from "@/lib/auth"; // this exports server-side-usable components.
import Hero from '@repo/ui/hero'
import { redirect } from "next/navigation";
// import { prismaclient } from "@repo/db/index.ts";

export default async function Home() {

    const session = await auth();
    const user = session?.user

    if (user) {
        redirect('/home');
    }

    return (
        <div id="hero">
            <Hero />
        </div>
    );
}
