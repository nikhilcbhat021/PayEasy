import AnimateDots from "@repo/ui/animatedDots";

export default function LoaderClient() {
    return <div className="flex text-3xl md:text-5xl font-extralight text-indigo-900">
        <p className="">Loading</p>
        <AnimateDots dotColor="indigo-900"/>
    </div>
}