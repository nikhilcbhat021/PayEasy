import LoaderClient from "@/components/LoaderClient";

export default function Loading () {
    console.debug('/app/loader.tsx');
    return <div className='h-full w-full flex justify-center items-center'>
        <LoaderClient />
    </div>
}