import ContentPlace from "../components/ContentPlace.tsx";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";

interface Conference {
    fields: {
        id: number;
        title: string;
        data: string;
        photo?: { fields: { file: { url: string } } }[]; // Optional field
    };
}

const HistoryPage = () => {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1]; // last segment of URL

    const { data, error, isLoading } = useQuery<Conference[]>({
        queryKey: ['historys'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "history" });
            return response.items.map(item => ({
                fields: {
                    id: item.fields.id,
                    title: item.fields.title,
                    data: item.fields.data,
                    photo: item.fields.photo || []
                }
            })) as Conference[];
        },
    });

    if (isLoading) return <div>Завантаження...</div>;
    if (error instanceof Error) return <div>Не вдалося завантажити дані: {error.message}</div>;

    // Filter conferences by ID
    const filterConferencesById = (conferences: Conference[], id: string) => {
        return conferences.filter(conference => conference.fields.id === parseInt(id));
    };

    if (!data) return <div>Дані не завантажені</div>;

    const filteredConference = filterConferencesById(data, lastSegment); // Filter conferences by ID

    const descriptions = filteredConference.map((event) => {
        return {
            title: event.fields.title,
            data: event.fields.data,
            img: event.fields.photo?.map((photo) => photo.fields.file.url) || [] // Safe navigation
        };
    });

    const resp = descriptions.length > 0 ? descriptions[0] : null; // Check for data presence

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
                        <div className="flex items-center flex-col mt-10">
                            {resp && resp?.img?.length > 0 ? (
                                resp.img.map((imageSrc, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        src={imageSrc}
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
