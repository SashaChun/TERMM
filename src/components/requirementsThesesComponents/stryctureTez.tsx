import client from "../../../contentfulClient.tsx";
import {useQuery} from "@tanstack/react-query";
import Loader from "../Loading.tsx";
import {BsPen} from "react-icons/bs";
import Line from "../Line.tsx";

const StryctureTez = () => {

    const fetchThematicDirections = async () => {
        const response = await client.getEntries({ content_type: "strystyretEz" });
        return response.items;
    };

    const { data: directions, isLoading, error } = useQuery({
        queryKey: ["strystyretEz"],
        queryFn: fetchThematicDirections,
    });

    if (isLoading) return <Loader />;
    if (error instanceof Error) return <div>Помилка: {error.message}</div>;

    const respFilter = directions?.flatMap(event => event.fields.textRule) ?? [];
    console.log(directions);

    return <div>
        <h4 className="text-[18px] sm:text-[23px] mt-2 font-semibold text-[#212529]">
            Структура тез
        </h4>
        <ul className="list-decimal list-outside text-left mt-4 space-y-3">
            {respFilter.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-3">
                    <BsPen className="w-5 shrink-0 mt-1.5 text-blue-600"/>
                    <div className="flex items-start space-x-2">
                        <span className="text-gray-700">{index + 1}.</span>
                        <p className="text-[#212529] text-[16px] sm:text-[18px]">{requirement}</p>
                    </div>
                </li>
            ))}
        </ul>
        <Line/>
        <p className={'text-black font-bold text-[20px]'}> {directions[0].fields.name}</p>
        <p className={'text-blue-700 font-bold text-[20px]'}>E-mail: {directions[0].fields.email}</p>
        <p className={'text-[#212529] font-bold text-[20px]'}> т. : {directions[0].fields.phone}</p>
    </div>
}

export default StryctureTez;