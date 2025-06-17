'use server'

import { BankInfoType } from "@/lib/types";
import * as db from "@repo/db/index.ts";
import { auth } from "../auth";

/**
 * This action is called on server, when the user clicks on the "Add Money" btn
 * in Wallet Topup Page.
 * 
 * @param provider : BankProvider from dropdown
 * @param amount : Number
 */
const startOnRampTxn = async(provider:BankInfoType, amount:number):Promise<{token: string}> => {

    // 1.  Create a txn and add it for the Loggen in User's(from session) OnRampTransactions[]
    //     with status - Pending.
    //
    // 2.  Nothing.

    const session = await auth();
    const user = session?.user;

    if (user && amount>0 && provider) {
        const newToken = await getRandomToken();
        const resp = await db.prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                onRampTransactions: {
                    create: {
                        provider: provider.name,
                        amount: amount,
                        status: db.OnRampTransactionStatus.Processing,
                        startTime: new Date(),
                        token: newToken, // Ideally the token should come from the bank server.
                    }
                }
            }
        })

        if (!resp) {
            return {token: '-1'};
        }

        return {token: newToken};
    }

    return {token: '-1'};
}

const getRandomToken = async() => {
    let found = false;
    let random = "";
    while (!found) {
        random = (Math.random() * 1000).toString();
        const txn = await db.prismaClient.onRampTransaction.findFirst({
            where: {
                token: random
            }
        })

        found = (txn === null);
    }

    console.log(random);
    return random;
}

export default startOnRampTxn;