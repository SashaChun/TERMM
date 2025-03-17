import ContentPlace from "../components/ContentPlace.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import { CiCalendar } from "react-icons/ci";
import Loader from "../components/Loading.tsx";

const ImportantDates = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['regulations'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "regulations" });
            return response.items.map(item => ({
                description: item.fields.description,
                titles: item.fields.title
            }));
        },
    });

    if (isLoading) return <Loader/>;
    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section className={'text-[#212529]'}>
                    <div className="mt-2">
                        <h4 className="w-[70%] text-[22px] font-bold font-[inherit] text-center mx-auto">
                            Регламент
                        </h4>
                        <p className={'text-[18px] mt-3 text-justify indent-8'}>{data && data[0]?.description}</p>
                        <div className="mt-5 space-y-3 ml-5">
                            {data &&
                                data[0]?.titles.map((title: string, index: number) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <CiCalendar className="text-[25px] text-blue-800" />
                                        <p className="text-[18px]">{title}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            </ContentPlace>
        </div>
    );
};

export default ImportantDates;
