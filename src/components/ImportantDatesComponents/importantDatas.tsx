import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";
import {CiCalendar} from "react-icons/ci";

const ImportantDatas = () => {
    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: ['Datas'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "Datas" });
            return response.items.map(item => ({
                legalentities: item.fields.remote,
                individuals: item.fields.local
            }));
        },
    });

    if (isLoading || isFetching) return <Loader />;
    if (error) return <p>Error loading data</p>;

    return (
        <div>
            <div>
                <p className="mt-5 text-[18px] font-bold font-[inherit]">
                    І. Для учасників, що планують прийняти участь в роботі конференції в дистанційному режимі :
                </p>
                <ul className="list-disc pl-10 space-y-2">
                    {data && data[0]?.legalentities.map((event, index) => (
                        <li key={index} className="flex items-center mt-3 space-x-2">
                            <CiCalendar className="text-[25px] text-blue-800"/>
                            <p className="text-[18px]">{event}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <p className="mt-5 text-[18px] font-bold font-[inherit]">
                    ІІ. Для учасників, що планують прийняти особисту участь в роботі конференції:
                </p>
                <ul className="list-disc pl-10 space-y-2">
                    {data && data[0]?.individuals.map((event, index) => (
                        <li key={index} className="flex items-center ">
                            <CiCalendar className="text-[25px] text-blue-800"/>
                            <p className="text-[18px]">{event}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ImportantDatas;
