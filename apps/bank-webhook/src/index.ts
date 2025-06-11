import express, { json } from 'express'
import * as db from '@repo/db/index.ts';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

// Responsible for marking the txn from Processing to Failed/Success.
// Also, add the txn to OnRampTransactions table.
// TODO: add a timer till which this txn could be in Pending state ??

app.get('/', (req, res) => {
    res.status(200).send('Hi there, welcome to Bank WebHook Server. Users don\'t have anything imp at this endpoint.');
})


app.post('/bankwebhook', async (req, res) => {

    // since 'userId & amount' params can be fetched from the OnRampTransactions table, they need not be sent from 
    // bank server. We may use them to validate if the requested amount(db) and the approved amount(req) 
    // are matching...
    const paymentInfo:{
        token: string,
        status: "approved" | "rejected"
    } = {
        token: req.body.token,
        // userId: req.body.user_identifier,
        // amount: req.body.amount,
        status: req.body.status
    }

    if (paymentInfo.token && paymentInfo.status) {
        try {
            const onramptxn = await db.prismaClient.onRampTransaction.findFirst({
                where: {token: paymentInfo.token},
                select: {
                    userId: true,
                    amount: true
                }
            })
            
            if (!onramptxn) {
                res.status(400).json({
                    msg: "Token is Invalid"
                })
                return;
            }
            console.log(onramptxn.userId);
            console.log(paymentInfo);

            await db.prismaClient.$transaction(async(txn) => {

                const user = await txn.$queryRawUnsafe(`SELECT * FROM "User" WHERE id = $1 FOR UPDATE`, onramptxn.userId);

                const resp = await txn.onRampTransaction.findFirst({
                    where: {
                        token: paymentInfo.token,
                    },
                    select : { 
                        status: true
                    }
                })

                
                console.log('before wait');
                // await new Promise(resolve => setTimeout(resolve, 4000));
                console.log('after wait');

                if (resp?.status === db.OnRampTransactionStatus.Processing) {

                    if (paymentInfo.status === "rejected") {
                        const ret = await txn.onRampTransaction.updateMany({
                            where: {
                                token: paymentInfo.token
                            },
                            data: {
                                status: db.OnRampTransactionStatus.Failed
                            }
                        })

                        res.status(200).json({
                            msg: "Transaction Rejected",
                        })
                    } else if (paymentInfo.status === "approved") {
                        const d1 = await txn.balance.update({
                            where: {
                                userId: onramptxn.userId
                            }, data: {
                                amount: {
                                    increment: Number(onramptxn.amount)
                                }
                            }
                        })
                        const d2 = await txn.onRampTransaction.updateMany({
                            where: {
                                token: paymentInfo.token
                            },
                            data: {
                                status: db.OnRampTransactionStatus.Success,
                            }
                        })

                        console.log(d1.amount)
                        console.log(d2.count)

                        res.status(200).json({
                            msg: "captured"
                        })
                    } else {
                        res.status(400).json({
                            msg: "Invalid Transaction Status sent from bank"
                        })
                    }
                } else {
                    console.log('Txn Already Processed... Maybe have a token expiry logic in place to avoid this..? ');
                    res.status(400).json({
                        msg: "Txn is already complete"
                    })
                }
            }, {
                maxWait: 5000,
                timeout: 20000
            })
        } catch (error) {
            console.log(error);

            res.status(500).json({
                msg: "DB Error."
            })
        }
    } else {
        res.status(400).json({
            msg: "Missing Inputs."
        })
    }

})

app.listen(8081, () => {console.log(`Listening at ${process.env.DATABASE_URL}`)});
// app.listen(process.env.WEB_HOOK_PORT);