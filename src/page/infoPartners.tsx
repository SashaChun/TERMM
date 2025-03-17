import React from "react";
import Linkify from "react-linkify";
import ContentPlace from "../components/ContentPlace.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";

const InfoPartners = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['info-partners'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "info-partners" });

            const assetsMap = new Map(
                response.includes?.Asset.map(asset => [asset.sys.id, asset.fields.file.url]) || []
            );

            return response.items.map(item => ({
                photo: assetsMap.get(item.fields.photo?.[0]?.sys.id) || "",
                description: item.fields.description || ""
            }));
        },
    });


    if (isLoading) return <Loader/>;
    const linkDecorator = (href, text, key) => (
        <a key={key} href={href} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section>
                    <h1 className="text-center mx-auto font-[500] text-[#212529] text-[18px] mt-2 sm:text-[23px]">
                        За рішенням оргкомітету конференції, наукові статті будуть рекомендовані до друку в наступних наукових виданнях:
                    </h1>
                    {data?.map((event, key) => (
                        <div key={key} className="flex flex-col md:flex-row mt-10 items-center gap-6">
                            <img src={event.photo} alt="Journal Cover" className="w-[250px] h-[300px] shadow-md rounded" />
                            <div className="text-gray-700">
                                {/* Linkify з кастомним стилем для посилань */}
                                <Linkify componentDecorator={linkDecorator}>
                                    <p>{event.description}</p>
                                </Linkify>
                                {/*<p className="mt-4 font-semibold">Вимоги до статей:</p>*/}
                                {/*<a href="https://jes.sumdu.edu.ua/author-guidelines/"*/}
                                {/*   className="text-blue-600 underline">*/}
                                {/*    https://jes.sumdu.edu.ua/author-guidelines/*/}
                                {/*</a>*/}
                                {/*<p className="mt-2 font-semibold">Умови публікації:</p>*/}
                                {/*<a href="https://jes.sumdu.edu.ua/article-processing-charges/"*/}
                                {/*   className="text-blue-600 underline">*/}
                                {/*    https://jes.sumdu.edu.ua/article-processing-charges/*/}
                                {/*</a>*/}
                            </div>
                        </div>
                    ))}
                </section>
            </ContentPlace>
        </div>
    );
};

export default InfoPartners;
