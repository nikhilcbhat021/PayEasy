import LoaderClient from '@/components/LoaderClient';

export default function Loading () {
    return <div className='h-full w-full flex justify-center items-center text-5xl'>
        <span>/app/(home)/loader.tsx</span>{' '}<LoaderClient />
    </div>
}
