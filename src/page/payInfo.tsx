import ContentPlace from "../components/ContentPlace.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";
import {useSelector} from 'react-redux'
import {  selectLanguage } from '../store/languageSlice'
 
interface PayInfoData {
    description: string;
    legalentities: string[];
    individuals: string[];
    includeContribution: string[];
    rezidense: string;
}

const PayInfo = () => {
    const lng = useSelector(selectLanguage);
    const { data, isLoading } = useQuery<PayInfoData[]>({
        queryKey: ['pay-info', lng],
        queryFn: async () => {
            const response = await client.getEntries({
                content_type: "pay-info",
                locale : lng,
            });

            return response.items.map(item => {
                const fields: any = item.fields ?? {};

                return {
                    description: typeof fields.description === "string" ? fields.description : "",
                    includeContribution: Array.isArray(fields.contributionIncludes)
                        ? fields.contributionIncludes.filter((value: any) => typeof value === "string")
                        : [],
                    rezidense:
                        typeof fields.rezidence?.content?.[0]?.content?.[0]?.value === "string"
                            ? fields.rezidence.content[0].content[0].value
                            : "",
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

    if (isLoading || !data) return <Loader />;

    const payInfo = data[0];

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section className="text-[#212529]">
                    <div className="mt-5">
                        <h4 className="w-[70%] text-[22px] font-bold text-center mx-auto">
                           {lng === 'uk' && 'Платіжна інформація'}
                           {lng === 'en-US' && 'Payment Information'}
                        </h4>
                        <p className="text-[18px] mt-5">
                            {payInfo?.description || "Інформація не знайдена"}
                        </p>

                        <div>
                            <h4 className="w-[70%] text-[20px] mt-8 font-bold text-center mx-auto">
                            {lng === 'uk' && 'ВНЕСОК ВКЛЮЧАЄ'}
                           {lng === 'en-US' && 'The fee includes'}
                            </h4>
                            <ul className="list-disc pl-5">
                                {payInfo?.includeContribution.length > 0 ? (
                                    payInfo.includeContribution.map((item, index) => (
                                        <li key={index} className="text-[18px] ml-2">
                                            {item}
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-[18px]">Дані відсутні</p>
                                )}
                            </ul>
                        </div>

                        <div>
                            <h4 className="w-[70%] text-[20px] mt-8 font-bold text-center mx-auto">
                               {lng === 'uk' && 'ПРОЖИВАННЯ'}
                                 {lng === 'en-US' && ' Accommodation'}
                            </h4>
                            <p className="text-[18px] mt-5">
                                {payInfo?.rezidense || "Інформація не знайдена"}
                            </p>
                        </div>

                        <div className="mt-8">
                            <p className="text-black font-bold text-[18px]">
                                {lng === 'uk' && 'Для юридичних осіб : '}
                                 {lng === 'en-US' && 'For legal entities :'}
                            </p>
                            {payInfo?.legalentities.length > 0 ? (
                                payInfo.legalentities.map((item, index) => (
                                    <p key={index} className="text-[18px]">
                                        {item}
                                    </p>
                                ))
                            ) : (
                                <p className="text-[18px]">Дані відсутні</p>
                            )}
                        </div>

                        <div className="mt-5">
                            <p className="text-black font-bold text-[18px]">
                            {lng === 'uk' && 'Для приватних осіб : '}
                            {lng === 'en-US' && ' For individuals :'}
                            </p>
                            {payInfo?.individuals.length > 0 ? (
                                payInfo.individuals.map((item, index) => (
                                    <p key={index} className="text-[18px]">
                                        {item}
                                    </p>
                                ))
                            ) : (
                                <p className="text-[18px]">Дані відсутні</p>
                            )}
                        </div>
                    </div>
                </section>
            </ContentPlace>
        </div>
    );
};

export default PayInfo;
