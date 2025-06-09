'use client'

import signup from "@/lib/auth/signup";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/text-input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function SignupClient() {

    const [error, setError] = useState<string>('');
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.status == "authenticated") {
            router.push('/home')
        }
    }, [session.status, router])
    
    return <div className="w-full h-full flex items-center justify-center ">
        <Card label="Signup to Payme" title_center className="w-[60%] md:w-[30%] h-fit p-4">
            <form className='py-2 flex flex-col gap-4' onSubmit={async(e) => {
                // 'use server';
                e.preventDefault();
                setDisableSubmit(true);
                const formData = new FormData(e.currentTarget);
                console.log("signup")
                // do input type checks (ZOD).
                // check if number is already present in db.
                // if not, then register, maybe start the account with base money?
                const phone = formData.get('phone') as string;
                const password = formData.get('password') as string;
                const cnf_password = formData.get('cnf_password') as string;

                
                
                try {

                    if (isNaN(Number(phone)) || phone.length !== 10) {
                        setError('Phone number is invalid');
                        return
                    } else if (password.length < 10) {
                        setError('Min Password length is 10 characters');
                        return
                    } else if (password !== cnf_password) {
                        setError('Passwords do not match');
                        console.log(password, cnf_password);
                        return
                    } else if (error !== '') {
                        setError('')
                    }

                    const result = await signup(phone, password);
                    if (result.err !== '') {
                        enqueueSnackbar(result.err, {variant: 'error'});
                    } else {
                        enqueueSnackbar('Successfully Signed Up!! Proceed to signin...', {variant: 'success'});
                        // setTimeout(() => {
                            router.push('/auth/signin');
                        // }, 1000);
                    }
                } catch(e) {
                    console.error(e);
                } finally {
                    setDisableSubmit(false);
                }

            }}>
                <TextInput label="Phone Number" name="phone" id="phone" type="number" required placeholder="9876567890"/>
                
                <TextInput label="Password" name="password" id="password" type="password" required placeholder="********"/>

                <TextInput label="Confirm Password" name="cnf_password" id="cnf_password" type="password" required placeholder="********"/>
                
                {error !== '' && <div className="text-red-600 text-sm text-center">* {error} *</div>}

                <Button disabled={disableSubmit} className="self-center" type="submit" category="dark" size="contained">SignUp</Button>
                <p>Already have an account? <span className="text-blue-600 cursor-pointer" ><Link href={'/auth/signin'}>sign-in</Link></span></p>
            </form>
        </Card>
    </div>
}