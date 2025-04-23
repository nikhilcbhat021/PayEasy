import { AddMoneyForm } from "@/components/AddMoneyForm";
import SendMoneyCard from "@/components/SendMoneyCard";
import { Card } from "@repo/ui/card";

const Transfer = async ({
    params
}: {
    params: Promise<{ landing: string }>
}) => {

    const params_data = await params;
    console.log(params_data);

    const outline = false;

    console.log('check if ci is working or not'2);

    return (
        <Card label="Send Money" labelStyles='font-semibold text-purple-700 text-4xl mb-12' no_padding className="bg-stone-200 divide-y-0">
            <div className="h-full flex flex-col justify-start mt-10 items-center">
                <div id="sendMoney" 
                    className={` w-[40%]
                        ${outline && 'outline-1'}
                    `}
                >
                    <SendMoneyCard />
                </div>
            </div>
        </Card>
    )
}

export default Transfer;