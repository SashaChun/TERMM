import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";
import ContentPlace from "../ContentPlace.tsx";
import { CiCalendar } from "react-icons/ci";

const Reglament = () => {
    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: ['regulations'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "regulations" });
            return response.items.map(item => ({
                description: item.fields.description,
                items: item.fields.item,
            }));
        },
    });

    if (isLoading || isFetching) return <Loader />;
    if (error) return <p>Error loading data</p>;

    console.log("Data fetched:", data);

    return (
        <div className={'flex justify-center'}>
                <div className={'text-[#212529]'}>
                    <h4 className="w-[70%] text-[22px] font-bold font-[inherit] text-center mx-auto">
                        Регламент
                    </h4>
                    <p className="text-[18px] mt-3 text-justify indent-8">
                        {data?.[0]?.description || "Опис відсутній."}
                    </p>
                    <div className="mt-5 space-y-3 ml-5">
                        <ul className="list-disc pl-5 space-y-2">
                            {data?.[0]?.items?.map((item, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <CiCalendar className="text-[25px] text-blue-800"/>
                                    <p className="text-[18px]">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
        </div>
    );
};

export default Reglament;