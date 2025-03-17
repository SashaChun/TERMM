import ContentPlace from "../components/ContentPlace.tsx";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";

const HisrtoryPage = () => {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1]; // останній сегмент URL

    const { data, error, isLoading } = useQuery({
        queryKey: ['historys'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "history" });
            return response.items;
        },
    });


    if (isLoading) return <Loader/>;    if (error instanceof Error) return <div>Не вдалося завантажити дані: {error.message}</div>;

    // Фільтрація конференцій за id
    const filterConferencesById = (conferences, id) => {
        return conferences.filter(conference => conference.fields.id === parseInt(id));
    };

    const filteredConference = filterConferencesById(data, lastSegment); // Фільтрація конференцій по id

    const descriptions = filteredConference.map((event) => {
        return {
            title: event.fields.title,
            data: event.fields.data,
            img: event.fields.photo?.map(photo => photo.fields.file.url) || []
        };
    });

    const resp = descriptions.length > 0 ? descriptions[0] : null; // Перевірка на наявність даних

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
                            {resp?.img.length > 0 ? (
                                resp.img.map((imageSrc, imgIndex) => (
                                    <img
                                        key={imgIndex}
                                        src={imageSrc}
                                        alt={`Зображення ${imgIndex + 1}`}
                                        className="w-[600px] h-[250px] md:h-[480px]  mt-10 object-cover shadow"
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
}

export default HisrtoryPage;
