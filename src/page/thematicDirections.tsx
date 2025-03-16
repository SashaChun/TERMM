import { BsPen } from "react-icons/bs";
import ContentPlace from "../components/ContentPlace.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";

const fetchThematicDirections = async () => {
    const response = await client.getEntries({ content_type: "thematic-directions" });
    return response.items;
};

const ThematicDirections = () => {
    const { data: directions, isLoading, error } = useQuery({
        queryKey: ["thematic-directions"],
        queryFn: fetchThematicDirections,
    });

    if (isLoading) return <div>Завантаження...</div>;
    if (error instanceof Error) return <div>Помилка: {error.message}</div>;

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section className="flex flex-col items-center">
                    <div className="p-4 bg-gray-100 text-[#212529] text-[18px]">
                        {directions.map((direction) => (
                            <div key={direction.sys.id} className="flex items-center space-x-2 mt-5 mb-2">
                                <BsPen className="w-5 shrink-0 text-blue-600" />
                                <p className="text-gray-800">{direction.fields.thematicDirectionsTitle}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </ContentPlace>
        </div>
    );
};

export default ThematicDirections;
