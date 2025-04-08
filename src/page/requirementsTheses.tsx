import ContentPlace from "../components/ContentPlace.tsx";
import client from "../../contentfulClient.tsx";
import { BsPen } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loading.tsx";
import Line from "../components/Line.tsx";
import StryctureTez from "../components/requirementsThesesComponents/stryctureTez.tsx";
import { EntryCollection, EntrySkeletonType } from "contentful";

interface RequirementFields {
    textRule: string[];
}

interface RequirementEntry extends EntrySkeletonType {
    fields: RequirementFields;
}

const RequirementsTheses = () => {
    const fetchThematicDirections = async () => {
        const response: EntryCollection<RequirementEntry> = await client.getEntries({
            content_type: "requirementsForAbstractDesign"
        });
        return response.items;
    };

    const { data: directions, isLoading, error } = useQuery({
        queryKey: ["requirementsForAbstractDesign"],
        queryFn: fetchThematicDirections,
    });

    if (isLoading) return <Loader />;
    if (error instanceof Error) return <div>Помилка: {error.message}</div>;

    const respFilter = directions?.flatMap(event => (event.fields as unknown as RequirementFields).textRule) ?? [];

    return (
        <div className="flex justify-center px-4 sm:px-0">
            <ContentPlace>
                <section className="w-full sm:w-[70%] mx-auto text-center">
                    <h4 className="text-[18px] sm:text-[23px] mt-2 font-semibold text-[#212529]">
                        Загальні вимоги до оформлення тез
                    </h4>

                    <ul className="list-decimal list-outside text-left mt-4 space-y-3">
                        {respFilter.map((requirement: string, index: number) => (
                            <li key={index} className="flex items-start space-x-3">
                                <BsPen className="w-5 shrink-0 mt-1.5 text-blue-600" />
                                <div className="flex items-start space-x-2">
                                    <span className="text-gray-700">{index + 1}.</span>
                                    <p className="text-[#212529] text-[16px] sm:text-[18px]">{requirement}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Line/>
                    <StryctureTez/>
                </section>
            </ContentPlace>
        </div>
    );
};

export default RequirementsTheses;