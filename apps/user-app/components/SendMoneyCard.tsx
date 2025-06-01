'use client'

import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/text-input'
import p2pTransfer from '@/lib/actions/p2pTransfer'
import { redirect } from 'next/navigation'
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { $Enums, OnRampTransactionStatus } from '.prisma/client'

import { enqueueSnackbar, closeSnackbar } from 'notistack'

const SendMoneyCard = () => {
    /**
     * TODO :-
     * 
     * 1. Create a modal to confirm the Transfer.
     */
    const [txnStatus, setTxnStatus] = useState<OnRampTransactionStatus>('Processing');
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

    return (
        <div>
        {txnStatus === OnRampTransactionStatus.Processing ? (
            <Card label='Send' title_center className='w-full'>
                <form onSubmit={(e) => formAction(e, setDisableSubmit, setTxnStatus)} className='py-2 flex flex-col gap-4'>
                    <TextInput placeholder='Number' label='Number' name='number' id='send_number' type='number' required />
                    <TextInput placeholder='Amount' label='Amount' name='amount' id='send_amount' type='number' required />
                    <Button disabled={disableSubmit} category='dark' type='submit' className='self-center'>Send</Button>
                </form>
            </Card> ) : (
                txnStatus === OnRampTransactionStatus.Success ? (
                    <Card className='text-center text-green-600 text-4xl p-20'>
                        Success
                    </Card>
                ) : (
                    <Card className='text-center text-red-800 text-4xl p-20'>
                        Failed
                    </Card>
                )
            )
        }
        </div>
    )
}

const formAction = async (e:FormEvent<HTMLFormElement>, setDisableSubmit:React.Dispatch<React.SetStateAction<boolean>>, setTxnStatus:React.Dispatch<React.SetStateAction<$Enums.OnRampTransactionStatus>>) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
        console.log('action');
        setDisableSubmit(true);
        const result = await p2pTransfer(Number(formData.get('amount'))*100, Number(formData.get('number')));
        if (result !== null) {
            console.log(result);
            if (result.errMsg !== "") {
                // setTxnStatus(OnRampTransactionStatus.Processing);
                enqueueSnackbar(result.errMsg, { variant: "error" });
            } else if (result.id !== -1) {
                // setTxnStatus(OnRampTransactionStatus.Success);
                setTxnStatus(result.status)
                enqueueSnackbar('Transaction Successfull. id = '+result.id , { variant: "success" });
                // redirect(formData.get('bank') as string);
            } else {
                // setTxnStatus(OnRampTransactionStatus.Failed);
                setTxnStatus(result.status)
                enqueueSnackbar('Transaction Failed. id = '+result.id , { variant: "error" });    
            }
        } else {
            setTxnStatus(OnRampTransactionStatus.Failed);
            enqueueSnackbar('Transaction Failed due to server error', { variant: "error" });
            // redirect('/404');
        }
    } catch (error) {
        console.log('Caught');
        console.log((error as Error))
        enqueueSnackbar((error as Error).message , { variant: "error" });
    } finally {
        setDisableSubmit(false);
    }
}


export default SendMoneyCard