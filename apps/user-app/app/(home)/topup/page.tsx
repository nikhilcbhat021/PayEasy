import { AddMoneyForm } from '@/components/AddMoneyForm';
import { ViewBalanceCard } from '@/components/ViewBalanceCard';
import { ViewTxnsCard } from '@/components/ViewTxnsCard';
import { auth } from '@/lib/auth'; 
import { Session } from 'next-auth';
import * as db from '@repo/db/index.ts';
import { getAllTransactions } from '@/lib/actions/transactions';

const getBalance = async (session: Session | null) => {

    const balance = await db.prismaClient.balance.findFirst({
        where: {
            userId: session?.user.id
        },
        select: {
            amount: true,
            locked: true,
            id: true
        }
    })

    return balance || {amount: 0, locked: 0, id: -1};
}

// const getAllOnRampTransactions = async (session: Session | null) => {
//     const userId = session?.user.id;

//     const txns = await db.prismaClient.user.findFirst({
//         where: {
//             id: userId
//         },

//         select: {
//             onRampTransactions: true,
//         }
//     })

//     return txns?.onRampTransactions.map<IOnRampTransaction>(t => ({
//         id: t.id,
//         time: t.startTime,
//         amount: t.amount,
//         status: t.status,
//         provider: t.provider
//     })) || Array<IOnRampTransaction>();
// }

const Topup = async () => {

    const session = await auth();
    const balance = await getBalance(session);
    const txns = await getAllTransactions(true);    //onramp = true

    const outline = false;

    return (
        <div className='h-full'>
            <p className='font-semibold text-purple-700 text-4xl mb-12'>Topup</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div id="addMoney" className={`md:row-span-2
                        ${outline && 'outline-1'}
                    `}>
                    <AddMoneyForm />
                </div>
                <div id="viewBalance" className={`
                        ${outline && 'outline-1'}
                    `}>
                    <ViewBalanceCard locked_balance={balance.locked} unlocked_balance={balance.amount}/>
                </div>
                <div id="txns" className={`
                        ${outline && 'outline-1'}
                    `}> 
                    <ViewTxnsCard allTransactions={txns}/>
                </div>
            </div>
        </div>
    )
}

export default Topup;