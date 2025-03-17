import ContentPlace from "../components/ContentPlace.tsx";
import {useQuery} from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";

const PayInfo = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['pay-info'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "pay-info" });
            return response.items.map(item => ({
                description: item.fields.description,
                legalentities: item.fields.legalentities,
                individuals: item.fields.individuals
            }));
        },
    });


    if (isLoading) return <Loader/>;
    console.log(data)

    return <div className={'flex justify-center'}>
        <ContentPlace>
            <section className={'text-[#212529]'}>
                <div className="mt-5">
                    <h4 className="w-[70%] text-[22px] font-bold font-[inherit] text-center mx-auto">
                        Платіжна інформація
                    </h4>
                    <p className={'text-[18px] mt-5'}>{data && data[0]?.description}</p>
                    <div className={'mt-5'}>
                        <p className={'text-black  font-bold text-[18px]'}>Для юридичних осіб :</p>
                        {data && data[0]?.legalentities.map((event) => (
                            <p className={'text-[18px]'}>{event}</p>
                        ))}
                    </div>
                    <div className={'mt-5'}>
                        <p className={'text-black font-bold text-[18px]'}>Для приватних осіб :</p>
                        {data && data[0]?.individuals.map((event) => (
                            <p className={'text-[18px]'}>{event}</p>
                        ))}
                    </div>
                </div>
            </section>
        </ContentPlace>
    </div>
}

export default PayInfo;