'use client'

import signin from "@/lib/auth/signin";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/text-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export default function SigninClient() {

    const [error, setError] = useState<string>('');
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

    const router = useRouter();


    return <div className="w-full h-full flex items-center justify-center ">
        <Card label="Signup to Payme" title_center className="w-[60%] md:w-[30%] h-fit p-4">
            <form className='py-2 flex flex-col gap-4' onSubmit={async (e) => {
                // 'use server';
                e.preventDefault();
                setDisableSubmit(true);
                const formData = new FormData(e.currentTarget);
                console.log("signin")
                // do input type checks (ZOD).
                // check if number is already present in db.
                // if not, then register, maybe start the account with base money?
                const phone = formData.get('phone') as string;
                const password = formData.get('password') as string;


                try {

                    if (isNaN(Number(phone)) || phone.length !== 10) {
                        setError('Phone number is invalid');
                        return;
                    } else if (password.length < 10 && phone != '9999999999') {
                        setError('Min Password length is 10 characters');
                        return;
                    } else if (error !== '') {
                        setError('')
                    }

                    const result = await signin(formData);

                    console.log(result);

                    if (result.err !== '') {
                        setError(result.err)
                        enqueueSnackbar(result.err, { variant: 'error' });
                    } else {
                        // setTimeout(() => {
                        router.push('/home');
                        // }, 1000);
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    setDisableSubmit(false);
                }

            }}>
                <TextInput label="Phone Number" name="phone" id="phone" type="number" required placeholder="9876567890" />

                <TextInput label="Password" name="password" id="password" type="password" required placeholder="********" />

                {error !== '' && <div className="text-red-600 text-sm text-center">* {error} *</div>}

                <Button disabled={disableSubmit} className="self-center" type="submit" category="dark" size="contained">SignIn</Button>
                <p>Don't have an account? <span className="text-blue-600 cursor-pointer" ><Link href={'/auth/signup'}>sign-up</Link></span></p>
            </form>
        </Card>
    </div>
}