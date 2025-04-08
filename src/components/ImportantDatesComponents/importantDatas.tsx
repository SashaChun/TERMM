

import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";
import { CiCalendar } from "react-icons/ci";

// Define the type for the expected response from the Contentful API
interface Data {
    legalentities: string[]; // Expected to be an array of strings
    individuals: string[];   // Expected to be an array of strings
}

const ImportantDatas = () => {
    const { data, error, isLoading, isFetching } = useQuery<Data[]>({
        queryKey: ['Datas'],
        queryFn: async () => {
            const response = await client.getEntries({
                content_type: "Datas",
            });

            return response.items.map((item) => ({
                legalentities: Array.isArray(item.fields.remote)
                    ? item.fields.remote.filter((el): el is string => typeof el === 'string')
                    : [],
                individuals: Array.isArray(item.fields.local)
                    ? item.fields.local.filter((el): el is string => typeof el === 'string')
                    : [],
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
                    // Ігнорування помилки типізації на конкретному рядку
                    // @ts-ignore
                    {data && data.length > 0 && data[0]?.legalentities?.map((event: string, index: number) => (
                        <div key={index}>{event}</div>
                    ))}


                </ul>
            </div>
            <div>
                <p className="mt-5 text-[18px] font-bold font-[inherit]">
                    ІІ. Для учасників, що планують прийняти особисту участь в роботі конференції:
                </p>
                <ul className="list-disc pl-10 space-y-2">
                    {data && data[0]?.individuals?.map((event: string, index: number) => (
                        <li key={index} className="flex items-center">
                            <CiCalendar className="text-[25px] text-blue-800" />
                            <p className="text-[18px]">{event}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ImportantDatas;
