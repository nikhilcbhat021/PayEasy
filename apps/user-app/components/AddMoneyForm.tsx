import { BankInfoType, BaseType } from '@/lib/types';
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { TextInput } from '@repo/ui/text-input';
import { Select } from '@repo/ui/select'
import { redirect } from 'next/navigation';

import startOnRampTxn from '@/lib/actions/startWalletTopup';

const SUPPORTED_BANKS:Array<BankInfoType> = [{
    name: "HDFC Bank",
    ac_number: "1234567890",
    link: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    ac_number: "1234567891",
    link: "https://www.axisbank.com/"
}, {
    name: "Dummy Bank",
    ac_number: "0000000000",
    link: "https://www.mockbank.io/"
},];

const addMoneyAction = async (formData: FormData) => {
    'use server';
    
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
    if (result)
        redirect(formData.get('bank') as string);
    else
        redirect('/404');
}

export const AddMoneyForm = () => {

    const bankSelectOptions:BaseType[] = SUPPORTED_BANKS.map((bank) => {
        return {
            key: bank.name,
            value: bank.link
        }
    })

    return (
        <div className="w-full flex gap-2 flex-col items-center">
            <Card label='Add Money'>
                <form action={addMoneyAction} className='flex gap-4 flex-col '>
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
