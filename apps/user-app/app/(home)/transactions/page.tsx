import { ViewTxnsCard } from "@/components/ViewTxnsCard";
import { getAllTransactions } from "@/lib/actions/transactions";
import { auth } from "@/lib/auth";
import { Card } from "@repo/ui/card";
import { redirect } from "next/navigation";

import * as db from '@repo/db/index.ts';

type LocalTransaction = {
    id: number;
    amount: number;
    status: db.$Enums.OnRampTransactionStatus;
    startTime: Date;
    fromId: string;
    toId: string;
    toUser: {
        number: string;
        name: string | null;
    };
    fromUser: {
        number: string;
        name: string | null;
    };
}


const Transactions = async ({
    params
}: {
    params: Promise<{ landing: string }>
}) => {

    const session = await auth();
    if(!session?.user) {
        redirect('/')
    }

    const params_data = await params;
    console.log(params_data);

    const allRawTransactions = await getAllTransactions(false);


    // Data Manipulation... To include name and number of recepient(debit) or sender(credit)
    const allTransactions = allRawTransactions.map((txn:any) => {
        return {
            ...txn,
            "name": 'toId' in txn && (
                txn.toId === session.user.id ? txn.fromUser.name || "unknown" : txn.toUser.name || "unknown"
            ) || "unknown",
            "number": 'toId' in txn && (
                txn.toId === session.user.id ? txn.fromUser.number : txn.toUser.number
            ) || '0000000000'
        }
    })


    return (
        // <div className="w-full flex gap-2 flex-col items-center">
            <Card label='Peer Transactions'
                    no_padding className="bg-stone-200 divide-y-0"
                    labelStyles='font-semibold text-purple-700 text-4xl mb-12'
            >
                <ViewTxnsCard showIcons allTransactions={allTransactions}/>
            </Card>
        // </div>
    )
}

export default Transactions;