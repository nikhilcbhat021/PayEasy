'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { SnackbarProvider } from 'notistack'

const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <SessionProvider>
            <SnackbarProvider autoHideDuration={3000} >
                {children}
            </SnackbarProvider>
        </SessionProvider>
    )
}

export default Providers