'use server';

import * as db from '@repo/db/index.ts';
import { ErrorCodeMappings } from '@/lib/types';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

interface signupReturn {
    err:string, 
    phone?:string, 
    balance?:number
}

export default async function signup(phone:string, password:string):Promise<signupReturn> {

    const result:signupReturn = {
        err: ''
    }

    try {
        const userFound = await db.prismaClient.user.findFirst({
            where: {
                number: phone
            }
        })

        if (userFound) {
            result.err = ErrorCodeMappings.err_user_already_exists
            return result;
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password as string, saltRounds);

        const newUser = await db.prismaClient.user.create({
            data: {
                email: `Un-used-fornow-${randomUUID()}.gmail.com`,
                number: phone as string,
                password: hashedPassword,
                balance: {
                    create: {
                        amount: 100,
                        locked: 0
                    }
                }
            }, 
            select: {
                number: true,
                balance: true
            }
        })
        
        result.err = '';
        result.phone = newUser.number;
        result.balance = Number(newUser.balance)

        return result;

    } catch(e) {
        console.log("Error on server");
        console.log((e as Error).message);

        result.err = (e as Error).message;
    } finally {
        return result
    }
}
