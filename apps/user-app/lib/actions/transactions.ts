'use server'

import * as db from '@repo/db/index.ts';
import { auth } from "../auth";

export const getAllTransactions = async (onramp: boolean) => {
    const _session = await auth();
    const userId = _session?.user.id;

    try {
        if (onramp) {
            const txn = await db.prismaClient.onRampTransaction.findMany({
                where: {userId: userId},
                omit: {
                    userId: true,
                    token: true,
                }, orderBy: {
                    startTime: 'desc'
                }
            })

            return txn;

        } else {
            const txn = await db.prismaClient.p2pTransaction.findMany({
                where: {
                    OR: [{
                        fromId:userId
                    }, { 
                        toId:userId 
                    }]
                }, omit: {
                    token: true
                }, 
                include: {
                    fromUser: {
                        select: {
                            name: true,
                            number: true
                        }
                    },
                    toUser: {
                        select: {
                            name: true,
                            number: true
                        }
                    }
                }, orderBy: {
                    startTime: 'desc'
                }
            })

            console.log(txn);
            return txn;
        }
    } catch(e) {
        console.log(e);
        throw new Error((e as Error).message);
    }    
}
