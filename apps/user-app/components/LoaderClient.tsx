import AnimateDots from "@repo/ui/animatedDots";

export default function LoaderClient() {
    return <div className="flex">
        <p>Loading</p>
        {<AnimateDots />}
    </div>
}