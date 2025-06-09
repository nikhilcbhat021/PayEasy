import Statistics from "@repo/ui/statisticsHome";

const Landing = async ({
    params
}: {
    params: Promise<{ home: string }>
}) => {

    // const params_data = await params;
    // console.log(params_data);

    return (
        <Statistics/>
    )
}

export default Landing;