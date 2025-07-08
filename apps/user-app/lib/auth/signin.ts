'use server';

import * as db from '@repo/db/index.ts';
import { ErrorCodeMappings } from '@/lib/types';
import { randomUUID } from 'crypto';
import { auth } from '../auth';
import { signIn } from '@/lib/auth';

import { AuthError } from 'next-auth';
import { RedirectStatusCode } from 'next/dist/client/components/redirect-status-code';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

interface signinReturn {
    err:string,
    message?:string,
    phone?:string, 
    balance?:number
}

export default async function signin(formData:FormData):Promise<signinReturn> {

    const result:signinReturn = {
        err: ''
    }
    

    try {
        // const userFound = signIn("credentials", );
        const userFound = await signIn("credentials", {
            number: formData.get('phone'),
            password: formData.get('password'),
            redirect: true,
            redirectTo: '/'
        })

        console.log(userFound);
        if (!userFound) {
            result.err = ErrorCodeMappings.err_incorrect_creds
            return result;
        }

        result.err = '';
        // result.phone = userFound.;
        // result.balance = Number(userFound.balance)

        return result;

    } catch(e) {
        console.log("Error on server");
        console.log((e as Error).message);
        console.log(e);

        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin": 
                    result.message = 'Invalid Credentials';
                    result.err = 'Invalid Credentials';
                    return result;
                
                default:
                    result.message = 'Something went wrong!!';
                    result.err = 'Something went wrong!!';
                    return result;
            }
        }
        if (isRedirectError(e)) {
            throw e
        }
        result.err = (e as Error).message;

        // throw e;
    } finally {
        return result
    }
}
