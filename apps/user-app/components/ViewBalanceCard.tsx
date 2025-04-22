import { Card } from "@repo/ui/card";

export const ViewBalanceCard = ({ unlocked_balance, locked_balance }: { unlocked_balance: number, locked_balance: number }) => {
    return (
        <div className="w-full flex gap-2 flex-col items-center">
            <Card className='text-sm'>
                <h1 className='text-xl mb-4 pb-2'>Balance</h1>
                <div className="flex justify-between gap-2 p-2">
                    <p>Unlocked Balance</p>
                    <p>{unlocked_balance/100} INR</p>
                </div>
                <div className="flex justify-between gap-2 p-2">
                    <p>Locked Balance</p>
                    <p>{locked_balance/100} INR</p>
                </div>
                <div className="flex justify-between gap-2 p-2">
                    <p>Total Balance</p>
                    <p>{(unlocked_balance + locked_balance)/100} INR</p>
                </div>
            </Card>
        </div>
    );
  };
  