import LoaderClient from '@/components/LoaderClient';

export default function Loading () {
    console.debug('/app/(home)/loader.tsx');
    return <div className='h-screen w-full flex justify-center items-center'>
        <LoaderClient />
    </div>
}
