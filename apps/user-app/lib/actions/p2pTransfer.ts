'use server'

import { auth } from "../auth";
import * as db from '@repo/db/index.ts';

const p2pTransfer = async (amount: number, to_number: number):Promise<{id:number}> => {

    /**
     * 
     * TODO :-
     * 
     * zod validations.
     * 
     * Check if 'to_number' exists (to_number validated).
     * 
     * This fn throws Error, should be wrapped in try/catch.
     * 
     * Start a Txn. (with timeout, maxWait)
     *      Lock the row to prevent simultaneous debits.
     *      Check if 'from_number' (get from session) has enough balance (amount validated).
     *      Decrement 'amount' at 'from_number'
     *      Increment 'amount' at 'to_number'
     *      Return true
     * If anything failed, throw an error, which would return a false.
     * Return true.
     */

    if (!amount || !to_number || to_number.toString().length !== 10 || amount <= 0) {
        throw new Error('Invalid Inputs');
    }

    const session = await auth();

    if (!session?.user) {
        throw new Error('User not signed in');
    }

    const from_id = session?.user.id;
    const from_number = session.user.number;

    if (to_number === from_number) {
        throw new Error('Can\'t send money to yourself');
    }

    const to_id = await db.prismaClient.user.findFirst({
        where: {
            number: to_number.toString()
        }, select: {
            id: true,
        }
    })

    if (!to_id) {
        throw new Error ('Recepient User not found. Please check the number');
    }

    let txnTracker:{id:number, status:db.OnRampTransactionStatus} = { 
        id: -1, status: db.OnRampTransactionStatus.Failed 
    }


    try {
        
        txnTracker = { 
            "id": await db.prismaClient.p2pTransaction.create({
                    data: {
                        amount: amount,
                        startTime: new Date(),
                        status: db.OnRampTransactionStatus.Processing,
                        toId: to_id.id,
                        fromId: from_id as string,
                    }, select: {
                        id: true
                    }
                }).then((d) => d.id) ,
            "status":  db.OnRampTransactionStatus.Processing
        }
        
        

        await db.prismaClient.$transaction(async (txn) => {
            await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from_id)} FOR UPDATE`;

            const from_balance = await txn.user.findFirst({
                where: {
                    id: from_id
                }, select: {
                    balance: true
                }
            })

            if (!from_balance || Number(from_balance.balance?.amount) < amount) {
                throw new Error('Insufficient Balance');
            }

            // await new Promise(r => setTimeout(r, 4000));
            
            await txn.balance.update({
                where: {
                    userId: from_id
                }, data: {
                    amount: {
                        decrement: amount
                    }
                }
            })

            await txn.balance.update({
                where: {
                    userId: to_id?.id
                }, data: {
                    amount: {
                        increment: amount
                    }
                }
            })

            await txn.p2pTransaction.update({
                where: {
                    id: txnTracker.id
                },
                data: {
                    status: db.OnRampTransactionStatus.Success,
                }, select: {
                    id: true
                }
            })

            txnTracker.status = db.OnRampTransactionStatus.Success
        }, {
            maxWait: 5000,  //db connection max wait.
            timeout: 20000  //max time till which this txn is valid.
        })

        console.log("Nikhil", "Transaction Success -- "+txnTracker);
        return txnTracker
    } catch (error) {
        console.log((error as Error).message);
        throw new Error((error as Error).message);
    } finally {
        if (txnTracker.id !== -1 && txnTracker.status !== db.OnRampTransactionStatus.Success) {
            console.log("Nikhil", "Transaction Failed -- "+txnTracker);
            await db.prismaClient.p2pTransaction.update({
                where: {
                    id: txnTracker.id
                },
                data: {
                    status: db.OnRampTransactionStatus.Failed,
                }, select: {
                    id: true
                }
            })
        }
    }
}

export default p2pTransfer;