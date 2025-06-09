'use client'

import Appbar from '@repo/ui/appbar'
import React, { useEffect, useMemo, useState } from 'react'
import { signIn, signOut } from 'next-auth/react';  // used at UI side.
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { User, Session } from 'next-auth';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';


const AppbarClient = ({user_prop}: {user_prop: User|undefined}) => {

    const router = useRouter();
    console.log(user_prop);


    const signin_cb = () => {
        signIn();
        // console.log('pushing /home')
        // router.push('/home');
    }

    const signout_cb = () => {
        signOut();
    }

    return (
        <div className='w-full'>
            <Appbar onSignin={signin_cb} onSignout={signout_cb} user={user_prop || {}} authenticated={user_prop !== undefined} />
        </div>
    )
}

export default AppbarClient