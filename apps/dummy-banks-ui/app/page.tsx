import Link from 'next/link';

export default async function Home() {
    return <div className="h-full w-full flex flex-col justify-start gap-7 items-center p-4 pt-8 ml-2 text-center">
        <p className="text-4xl font-light mt-18 pt-6 pb-10">Welcome to DummyBanks@UI</p>
        <p>Created to simulate a netbanking ui with <strong>Approve/Reject</strong> Transaction Card.</p>
        <p>To know more about how to use it, you may visit my <span className="underline-offset-4 font-bold text-blue-800 decoration-blue-500 hover:text-blue-600 hover:underline"> <Link color="blue-600" className="hover:bg-blue-100  rounded p-1" href={'https://github.com/nikhilcbhat021/PayEasy/tree/main/apps/dummy-banks-ui'}> Github docs</Link></span> </p>
        <p>You may choose one of the dummy banks and proceed with sending a POST request, with token, amount, timestamp, wallet-webhook-url as body</p>
    </div>
}
