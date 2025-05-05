import express, { json } from 'express'
import * as db from '@repo/db/index.ts';


const app = express();
app.use(json());

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
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    if (paymentInfo.token) {
        try {
            await db.prismaClient.$transaction(async(txn) => {

                const user = await txn.$queryRawUnsafe(`SELECT * FROM "User" WHERE id = $1 FOR UPDATE`, paymentInfo.userId);

                const resp = await txn.onRampTransaction.findFirst({
                    where: {
                        token: paymentInfo.token,
                    },
                    select : { 
                        status: true
                    }
                })


                if (!resp) {
                    res.status(400).json({
                        msg: 'Token not found'
                    })
                    return;
                }

                console.log('before wait');
                // await new Promise(resolve => setTimeout(resolve, 4000));
                console.log('after wait');

                if (resp?.status === db.OnRampTransactionStatus.Processing) {
                    const d1 = await txn.balance.update({
                        where: {
                            userId: paymentInfo.userId
                        }, data: {
                            amount: {
                                increment: Number(paymentInfo.amount)
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

            res.status(200).json({
                msg: "captured"
            })
        } catch (error) {
            console.log(error);

            res.status(500).json({
                msg: "DB Error."
            })
        }
    }

})

// app.listen(process.env.WEB_HOOK_PORT);
app.listen(8081);