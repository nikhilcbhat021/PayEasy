import { OnRampTransaction, OnRampTransactionStatus, P2pTransaction, Prisma } from ".prisma/client";
import { auth } from "@/lib/auth";
import { Transaction } from "@/lib/types";
import { Card } from "@repo/ui/card";
import { redirect } from "next/navigation";
import { Incoming, Outgoing } from "./Icons";


const getAllTxns = async () => {
    'use server';
    console.log('returning txns');
    // we are passing allTxn in props.
}

const changePage = async (page:number) => {
    'use server';
    const maxPages = 100;

    console.log('returning txns');
    if (page === 0)
        return 0;
    if (page === maxPages)
        return page;
}

export const ViewTxnsCard = async ({ 
    allTransactions,
    showIcons=false,
 }: { 
    allTransactions:Array<Transaction>,
    showIcons?:boolean
}) => {

    const session = await auth();

    if (!session?.user) {
        redirect('/home');
    }


    const txnStatusColor = {
        [OnRampTransactionStatus.Processing]: 'text-amber-500',
        [OnRampTransactionStatus.Failed]: 'text-red-700',
        [OnRampTransactionStatus.Success]: 'text-lime-600',
    }

    if (!allTransactions.length) {
        return <div className="w-full flex gap-2 flex-col items-center">
            <Card label="Recent Transactions">
                <div className="flex items-center justify-center text-center h-56">
                    No Recent Transactions
                </div>
            </Card>
        </div>
    }
    return (
        <div className="w-full flex gap-2 flex-col items-center">
            <Card label="Recent Transactions" >
                <div className="flex flex-col items-stretch justify-start divide-y divide-stone-300">
                {
                    allTransactions.map((txn:Transaction) => 
                        <div key={txn.id} className="flex justify-between items-center gap-1 p-2 text-sm">
                            {/* Txn has date, state, amount, sent/received */}
                            <div className="flex justify-start items-center gap-4">
                                {showIcons && <div className="object-contain inline-block">
                                    {'fromId' in txn && txn.fromId === session.user.id ? <Outgoing/> : <Incoming/>}
                                    {/* {'toId' in txn &&  <div>{txn.toId as string}</div>} */}
                                </div>}
                                {showIcons && 
                                    <div className="mr-4">
                                        {'name' in txn && <div>{(txn.name as string)}</div> }
                                        {'number' in txn && <div>{txn.number as string}</div> }
                                    </div>
                                }
                                <div className="">
                                    <div className={`${txnStatusColor[txn.status]}`}>{txn.status}</div>
                                    <div>{txn.startTime.toLocaleDateString()}</div>
                                </div>
                            </div>
                            {showIcons && <div>
                                {'fromId' in txn && txn.fromId === session.user.id ? '-' : '+'}
                                {!showIcons && '+'}{' '}Rs.{Number(txn.amount)/100}
                            </div>}
                            {!showIcons && <div className="inline-block">+{' '}Rs.{Number(txn.amount)/100}</div>}
                        </div> 
                    )
                }
                </div>
                {/* <Pagination data={allTransactions} currPage={page} pageChange={changePage} /> */}
            </Card >
        </div>
    );
};
