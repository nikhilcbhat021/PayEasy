'use client'

import transferRequestAction from "@/lib/actions/transferRequestAction"
import { OnRampTransactionApprovalStatus } from "@repo/types/index.ts"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
// import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RequestCard({
    token, requester, phoneNumber, amount, onClick, webhook_url
}: {
    token:string,
    requester:string,
    phoneNumber:string,
    amount:string,
    onClick?:() => Promise<void>,
    webhook_url:string
}) {

    const [clicked, setClicked] = useState<OnRampTransactionApprovalStatus>('approved');
    const [disabled, setDisabled] = useState<boolean>(false);
    const router = useRouter();

    console.log(phoneNumber, typeof onClick);
    return <Card label='Transfer Request' title_center labelStyles="text-2xl md:text-4xl py-4">
        <form onSubmit={async(e) => {
            e.preventDefault();
            if (!token || !webhook_url || !clicked) {
                alert('Token/Webhook url/Amount is missing');
                return;
            }
            setDisabled(true);
            try {
                if (clicked === 'approved') {
                    // alert('approved');
                    console.log("approved");
                } else {
                    console.log("rejected");
                    // alert('rejected');
                }
                const webhookResponse = await transferRequestAction(token, webhook_url, clicked);
                alert(webhookResponse.msg);
            } catch(e) {
                console.log(e);
            } finally {
                setDisabled(false);
                router.push('/');
            }

        }} className='py-2 flex gap-4 flex-col'>
            <p className="text-xl md:text-3xl py-4 font-light text-center"> <span className="font-bold text-stone-600">{requester}</span> is requesting a transfer of <span className="font-semibold text-slate-600">Rs.{Number(amount)/100}</span>/- </p>
            <div className="self-center flex w-full gap-2 justify-center px-1 items-center">
                <div className="min-h-full w-1/2 rounded-md bg-green-700">
                    <Button disabled={disabled} onClick={() => setClicked("approved")} category='success' size="full-width" type='submit' className='self-center'>
                        <p className="text-md md:text-2xl">Approve</p>
                    </Button>
                </div>
                <div className="min-h-full w-1/2 rounded-md bg-red-700">
                    <Button disabled={disabled} onClick={() => setClicked("rejected")} category='failure' size="full-width" type='submit' className='self-center'>
                        <p className="text-md md:text-2xl">Reject</p>
                    </Button>
                </div>
            </div>
        </form>
    </Card> 
}