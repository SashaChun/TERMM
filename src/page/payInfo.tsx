import ContentPlace from "../components/ContentPlace.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";

// Тип для даних платіжної інформації
interface PayInfoData {
    description: string;
    legalentities: string[];
    individuals: string[];
    includeContribution: string[];
    rezidense: string;
}


const PayInfo = () => {
    const { data, isLoading } = useQuery<PayInfoData[]>({
        queryKey: ['pay-info'],
        queryFn: async () => {
            const response = await client.getEntries({
                content_type: "pay-info",
            });

            // Потрібно коректно обробляти дані
            return response.items.map(item => {
                const fields = item.fields ?? {};

                return {
                    description: typeof fields.description === "string" ? fields.description : "",
                    includeContribution: Array.isArray(fields.contributionIncludes)
                        ? fields.contributionIncludes.filter((value: any) => typeof value === "string")
                        : [],
                    rezidense: fields.rezidence?.content?.[0]?.content?.[0]?.value ?? "",
                    legalentities: Array.isArray(fields.legalentities)
                        ? fields.legalentities.filter((entity: any) => typeof entity === "string")
                        : [],
                    individuals: Array.isArray(fields.individuals)
                        ? fields.individuals.filter((individual: any) => typeof individual === "string")
                        : [],
                };
            });


        },
    });

    if (isLoading) return <Loader />;
    console.log(data);
    return (
        <div className={'flex justify-center'}>
            <ContentPlace>
                <section className={'text-[#212529]'}>
                    <div className="mt-5">
                        <h4 className="w-[70%] text-[22px] font-bold font-[inherit] text-center mx-auto">
                            Платіжна інформація
                        </h4>
                        <p className={'text-[18px] mt-5'}>
                            {data && data.length > 0 ? data[0]?.description : "Інформація не знайдена"}
                        </p>
                        <div>
                            <h4 className="w-[70%] text-[20px] mt-8 font-bold font-[inherit] text-center mx-auto">ВНЕСОК ВКЛЮЧАЄ</h4>
                            <div>
                                <ul className="list-disc pl-5">
                                    {data && data.length > 0 && data[0]?.includeContribution.length > 0 ? (
                                        data[0].includeContribution.map((event, index) => (
                                            <li key={index} className={'text-[18px] ml-2'}>{event}</li>
                                        ))
                                    ) : (
                                        <p className={'text-[18px]'}>Дані відсутні</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h4 className="w-[70%] text-[20px] mt-8 font-bold font-[inherit] text-center mx-auto">ПРОЖИВАННЯ</h4>
                            <p className={'text-[18px] mt-5'}>
                                {data && data.length > 0 ? data[0]?.rezidense : "Інформація не знайдена"}
                            </p>
                        </div>
                        <div className={'mt-8'}>
                            <p className={'text-black font-bold text-[18px]'}>Для юридичних осіб :</p>
                            {data && data.length > 0 && data[0]?.legalentities.length > 0 ? (
                                data[0].legalentities.map((event, index) => (
                                    <p key={index} className={'text-[18px]'}>{event}</p>
                                ))
                            ) : (
                                <p className={'text-[18px]'}>Дані відсутні</p>
                            )}
                        </div>
                        <div className={'mt-5'}>
                            <p className={'text-black font-bold text-[18px]'}>Для приватних осіб :</p>
                            {data && data.length > 0 && data[0]?.individuals.length > 0 ? (
                                data[0].individuals.map((event, index) => (
                                    <p key={index} className={'text-[18px]'}>{event}</p>
                                ))
                            ) : (
                                <p className={'text-[18px]'}>Дані відсутні</p>
                            )}
                        </div>
                    </div>
                </section>
            </ContentPlace>
        </div>
    );
};

export default PayInfo;
