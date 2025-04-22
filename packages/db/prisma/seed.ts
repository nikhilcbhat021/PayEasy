import { OnRampTransactionStatus, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
        where: { number: '9999999999' },
        update: {
            balance: {
                create: {
                    amount: 200000,
                    locked: 0
                }
            },
            onRampTransactions: {
                create: {
                    startTime: new Date(),
                    status: OnRampTransactionStatus.Success,
                    amount: 200000,
                    token: "token_1",
                    provider: "HDFC Bank",
                },
            },
        },
        create: {
            number: '9999999999',
            password: await bcrypt.hash('alice', 10),
            name: 'alice',
            email: 'alice@gmailcom',
            balance: {
                create: {
                    amount: 200000,
                    locked: 0,
                }
            },
            onRampTransactions: {
                create: {
                    startTime: new Date(),
                    status: OnRampTransactionStatus.Success,
                    amount: 200000,
                    token: "token_1",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    const bob = await prisma.user.upsert({
        where: { number: '9999999998' },
        update: {
            balance: {
                create: {
                    amount: 30000,
                    locked:0
                }
            },
            onRampTransactions: {
                create: {
                    startTime: new Date(),
                    status: OnRampTransactionStatus.Failed,
                    amount: 30000,
                    token: "token_2",
                    provider: "HDFC Bank",
                },
            },
        },
        create: {
            number: '9999999998',
            password: await bcrypt.hash('bob', 10),
            email: 'bob@gmail.com',
            name: 'bob',
            balance: {
                create: {
                    amount: 30000,
                    locked:0
                }
            },
            onRampTransactions: {
                create: {
                    startTime: new Date(),
                    status: OnRampTransactionStatus.Failed,
                    amount: 30000,
                    token: "token_2",
                    provider: "HDFC Bank",
                },
            },
        },
    })
    console.log({ alice, bob })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })