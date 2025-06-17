'use client'

import { BankInfoType, BaseType } from '@/lib/types';
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { TextInput } from '@repo/ui/text-input';
import { Select } from '@repo/ui/select'
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import startOnRampTxn from '@/lib/actions/startWalletTopup';
import { FormEvent } from 'react';


// Ideally this should come from database...
const SUPPORTED_BANKS:Array<BankInfoType> = [{
    name: "HDF-Sea Bank",
    ac_number: "1234567890",
    // link: "https://dummy-bank/HDF-Sea%20Bank"
    link: "http://localhost:3001/HDF-Sea%20Bank"
}, {
    name: "Axes Bank",
    ac_number: "1234567891",
    link: "https://dummy-bank/Axes%20Bank"
}, {
    name: "SBEye Bank",
    ac_number: "7862519038",
    link: "https://dummy-bank/SBEye%20Bank"
},];


export const AddMoneyForm = () => {

    const router = useRouter();

    const addMoneyAction = async (e:FormEvent<HTMLFormElement>) => {
        // 'use server';
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        console.log('---------------------------')
        console.log('Inside Add Money action');
        console.log(formData.get('bank'));
        console.log(formData.get('amount'));
        console.log('---------------------------')

        const bankInfo = SUPPORTED_BANKS.find(bank => bank.link === formData.get('bank'));
        console.log(bankInfo)
        const amount = formData.get('amount');
        // redirecting as per the architecture, to the specified dummy-bank URL.
        if (!bankInfo) {
            throw new Error('Selected bank is not supported.');
        }
        if (!amount) {
            throw new Error('Incorrect Amount entered');
        }

        const result = await startOnRampTxn(bankInfo, Number(amount)*100);
        console.log(process.env.WEBHOOK_URL);
        if (result && result.token !== '-1') {
            // redirect(formData.get('bank') as string, );
            router.refresh();
            window.open(`${formData.get('bank') as string}?token=${result.token}&amount=${Number(amount)*100}&webhook_url=${process.env.WEBHOOK_URL||'http://localhost:8081/bankwebhook'}`, '_blank')
        } else
            router.push('/500');

    }


    const bankSelectOptions:BaseType[] = SUPPORTED_BANKS.map((bank) => {
        return {
            key: bank.name,
            value: bank.link
        }
    })

    return (
        <div className="w-full flex gap-2 flex-col items-center">
            <Card label='Add Money'>
                <form onSubmit={addMoneyAction} className='flex gap-4 flex-col '>
                    <div>
                        <TextInput 
                            label='Amount'
                            placeholder='Amount'
                            type='number' required={true}
                            name="amount" id="amount"
                        />
                    </div>
                    <div>
                        <Select options={bankSelectOptions} name="bank" id="bank" label='Bank'/>
                    </div>
                    <Button className='self-center' type='submit'>Add Money</Button>
                </form>
            </Card>
        </div>
    );
};
