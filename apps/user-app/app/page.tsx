import { auth } from "@/lib/auth"; // this exports server-side-usable components.
import Hero from '@repo/ui/hero'
import { redirect } from "next/navigation";

export default async function Home() {

    const session = await auth();
    const user = session?.user

    console.log('Inside /page.tsx');
    console.log(user)

    if (user) {
        redirect('/home');
    }

    return (
        <div id="hero">
            <Hero />
        </div>
    );
}
