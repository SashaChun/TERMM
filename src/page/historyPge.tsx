import ContentPlace from "../components/ContentPlace.tsx";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";

const HistoryPage = () => {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    const { data, error, isLoading } = useQuery({
        queryKey: ['historys'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "history" });
            return response.items;
        },
    });

    if (isLoading) return <Loader/>;
    if (error instanceof Error) return <div>Не вдалося завантажити дані: {error.message}</div>;

    const filteredConference = data?.filter(
        conference => conference.fields.id === parseInt(lastSegment)
    ) || [];

    const resp = filteredConference.length > 0 ? filteredConference[0].fields : null;

    const renderDescription = (description) => {
        return description?.content.map((block, index) => (
            <div key={index}>
                {block.nodeType === "heading-5" && (
                    <h5 className="text-xl font-bold">{block.content[0]?.value}</h5>
                )}
                {block.nodeType === "paragraph" && (
                    <p className="text-base mt-2">{block.content[0]?.value}</p>
                )}
            </div>
        ));
    };

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section>
                    <div className="mt-4 flex items-center flex-col">
                        <h4 className="w-[70%] text-[30px] uppercase font-semibold text-[#212529] font-[inherit] text-center mx-auto">
                            {resp?.title || "Назва відсутня"}
                        </h4>
                        <p className="text-[20px] flex items-center mt-2 font-semibold text-[#212529] text-center mx-auto">
                            {resp?.data || "Дані відсутні"}
                        </p>
                        <div className="mt-4 text-[25px] flex items-center mt-2 font-semibold text-[#212529] text-center mx-auto">
                            {renderDescription(resp?.description)}
                        </div>
                        <div className="flex items-center flex-col mt-10">
                            {resp?.photo?.length > 0 ? (
                                resp.photo.map((photo, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        src={photo.fields.file.url}
                                        alt={`Зображення ${imgIndex + 1}`}
                                        className="w-[600px] h-[250px] md:h-[480px] mt-10 object-cover shadow"
                                    />
                                ))
                            ) : (
                                <p>Зображення відсутні</p>
                            )}
                        </div>
                    </div>
                </section>
            </ContentPlace>
        </div>
    );
};

export default HistoryPage;
