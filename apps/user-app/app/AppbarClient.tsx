'use client'

import Appbar from '@repo/ui/appbar'
import React from 'react'
import { signIn, signOut } from 'next-auth/react';  // used at UI side.
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();

    const user = {
        number: session.data?.user.number
    };

    const signin_cb = () => {
        signIn();
        console.log('pushing /home')
        router.push('/home');
    }
    
    const signout_cb = () => {
        signOut();
    }

    return (
        <div className='w-full'>
            <Appbar onSignin={signin_cb} onSignout={signout_cb} user={user} />
        </div>
    )
}

export default AppbarClient