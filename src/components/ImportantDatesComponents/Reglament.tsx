import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";
import { CiCalendar } from "react-icons/ci";

const Reglament = () => {
    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: ['regulations'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "regulations" });
            return response.items.map(item => ({
                description: item.fields.description as string,
                items: item.fields.item as string[],
            }));
        },
    });

    if (isLoading || isFetching) return <Loader />;
    if (error) return <p>Error loading data</p>;

    return (
        <div className={'flex justify-center'}>
            <div className={'text-[#212529]'}>
                <h4 className="w-[70%] text-[22px] font-bold font-[inherit] text-center mx-auto">
                    Регламент
                </h4>
                <p className="text-[18px] mt-3 text-justify indent-8">
                    {typeof data?.[0]?.description === "string" ? data[0].description : "Опис відсутній."}
                </p>
                <div className="mt-5 space-y-3 ml-5">
                    <ul className="list-disc pl-5 space-y-2">
                        {Array.isArray(data?.[0]?.items) ? (
                            data[0].items.map((item: string, index: number) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <CiCalendar className="text-[25px] text-blue-800"/>
                                    <p className="text-[18px]">{item}</p>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">Немає даних</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Reglament;
