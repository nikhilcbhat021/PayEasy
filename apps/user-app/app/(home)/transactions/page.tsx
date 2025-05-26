import { ViewTxnsCard } from "@/components/ViewTxnsCard";
import { getAllP2pTxns, getAllTransactions } from "@/lib/actions/transactions";
import { auth } from "@/lib/auth";
import { p2ptnxtype, Transaction } from "@/lib/types";
import { Card } from "@repo/ui/card";
import { redirect } from "next/navigation";

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

    const tempTxn = await getAllP2pTxns();

    // let r = tempTxn.map((txn) => {return {
    //     ...txn,
    //     "name": ('toId' in txn && (
    //         txn.toId === session.user.id ? txn.fromUser.name : txn.toUser.name
    //     )) || "unknown",
    //     "number": (txn.toId === session.user.id ? txn.fromUser.number : txn.toUser.number) || "0000000000"
    // }})
    // Data Manipulation... To include name and number of recepient(debit) or sender(credit)
    // const allTransactions = allRawTransactions.map((txn) => {
    //     return {
    //         ...txn,
    //         "name": 'toId' in txn && (
    //             txn.toId === session.user.id ? txn.fromUser.name || "unknown" : txn.toUser.name || "unknown"
    //         ) || "unknown",
    //         "number": 'toId' in txn && (
    //             txn.toId === session.user.id ? txn.fromUser.number : txn.toUser.number
    //         ) || '0000000000'
    //     }
    // })


    return (
        // <div className="w-full flex gap-2 flex-col items-center">
            <Card label='Peer Transactions'
                    no_padding className="bg-stone-200 divide-y-0"
                    labelStyles='font-semibold text-purple-700 text-4xl mb-12'
            >
                <ViewTxnsCard showIcons allTransactions={tempTxn}/>
            </Card>
        // </div>
    )
}

export default Transactions;