'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'
// import { SnackbarProvider } from 'notistack'

import { SnackbarProvider as RawSnackbarProvider } from 'notistack';

type SnackbarProviderProps = {
  children?: React.ReactNode;
  autoHideDuration?: number;
};

const SnackbarProvider = RawSnackbarProvider as unknown as React.ComponentType<SnackbarProviderProps>;


const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <SessionProvider>
            {/* REMOVE this line: */}
            {/* //@ts-expect-error Unused directive */}
            <SnackbarProvider autoHideDuration={3000} >
                {children}
            </SnackbarProvider>
        </SessionProvider>
    )
}

export default Providers