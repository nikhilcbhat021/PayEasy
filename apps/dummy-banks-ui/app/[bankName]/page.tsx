import RequestCard from "@/components/RequestCard";
// import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
// import { TextInput } from "@repo/ui/text-input";

export default async function DummyBank({
    params,
    searchParams
}: {
    params: Promise<{ bankName: string }>,
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {

    const { bankName } = await params;
    const { token = '', requester = 'Payme', phoneNumber = '+910000000000', amount='0', webhook_url='' } = await searchParams;
    // const requestBody = await fetch(`/api/${bankName}/`, {
    //     method: "POST",

    // })

    return <main className="w-[75%] flex flex-col justify-center items-center m-auto p-3">
        <p className="py-8 text-6xl font-light text-emerald-900 ">{bankName[0]?.toUpperCase()+bankName.substring(1)}{'  '}Netbanking</p>
        
        <Card 
            labelStyles='font-semibold text-purple-700 text-4xl mb-12' 
            // no_padding 
            className="bg-stone-200 divide-y-0 p-8 w-[80%]"
        >
            <RequestCard token={token} requester={requester} phoneNumber={phoneNumber} amount={amount} webhook_url={webhook_url} />
        </Card>
    </main>
}

{/* <div className="h-full flex flex-col justify-start mt-10 items-center">
    <div id="sendMoney" 
        className={`w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]
            ${outline && 'outline-1'}
        `}
    >
        <Card >
            <p>{token}</p>
            <p>{requester}</p>
            <p>{phoneNumber}</p>
            <p>{amount}</p>
        </Card>
    </div>
</div> */}