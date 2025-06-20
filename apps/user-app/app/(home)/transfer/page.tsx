import { AddMoneyForm } from "@/components/AddMoneyForm";
import SendMoneyCard from "@/components/SendMoneyCard";
import { Card } from "@repo/ui/card";

const Transfer = async ({
    params
}: {
    params: Promise<{ landing: string }>
}) => {

    const params_data = await params;
    // console.log(params_data);

    const outline = false;

    return (
        <Card 
            label="Send Money" 
            labelStyles='font-semibold text-purple-700 text-2xl md:text-4xl mb-12' 
            // no_padding 
            className="bg-stone-200 divide-y-0"
        >
            <div className="h-full flex flex-col justify-start mt-10 items-center">
                <div id="sendMoney" 
                    className={`w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]
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