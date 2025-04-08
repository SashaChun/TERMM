import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";

interface Asset {
    sys: {
        id: string;
    };
    fields: {
        file?: { // Додаємо optional, оскільки це може бути undefined
            url: string;
        };
    };
}

const Organizers = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['organizerssang'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "organizerssang" });

            return response.items.map((item) => {
                // Типізуємо photoArray як Asset[] або null
                const photoArray = item.fields.photo as Asset[] | null;

                // Перевіряємо, чи є photoArray і чи є в ньому елементи
                const photoId = Array.isArray(photoArray) && photoArray.length > 0 ? photoArray[0].sys?.id : null;

                // Якщо photoId є, шукаємо відповідне фото
                const photo = photoId
                    ? response.includes?.Asset?.find((asset: Asset) => asset.sys.id === photoId)
                    : null;

                // Перевіряємо, чи є фото і файл
                const photoUrl = photo && photo.fields.file ? `https:${photo.fields.file.url}` : null;

                return {
                    link: typeof item.fields.link === 'string' ? item.fields.link : '#',
                    photo: photoUrl,
                };
            });
        },
    });

    if (isLoading) return <Loader />;
    if (error) return <div>Щось пішло не так. Спробуйте знову пізніше.</div>;

    const reversedData = data ? [...data].reverse() : [];

    if (reversedData.length === 0) {
        return <div>Немає організаторів для відображення.</div>;
    }

    return (
        <div className="bg-white py-0 sm:py-10">
            <div className="flex justify-center gap-4 sm:gap-8 flex-wrap mb-10">
                <a href={reversedData[1]?.link || "#"}>
                    <img
                        className="w-[250px] sm:w-[300px] h-[150px] sm:h-[200px] rounded-[20px] p-5 border-2 border-transparent hover:border-gray-400 hover:shadow-xl transition-all duration-300 ease-in-out"
                        src={reversedData[1]?.photo || "/path/to/default-image.jpg"} // Замість порожнього рядка ставимо шлях до зображення за замовчуванням
                        alt="universityLogos"
                    />
                </a>
                <a href={reversedData[0]?.link || "#"}>
                    <img
                        className="w-[250px] sm:w-[300px] h-[150px] sm:h-[200px] rounded-[20px] p-5 border-2 border-transparent hover:border-gray-400 hover:shadow-xl transition-all duration-300 ease-in-out"
                        src={reversedData[0]?.photo || "/path/to/default-image.jpg"} // Замість порожнього рядка ставимо шлях до зображення за замовчуванням
                        alt="universityLogos"
                    />
                </a>
            </div>
            <div className="p-5 flex flex-wrap justify-center gap-0 sm:gap-8">
                {reversedData.slice(2).map((logo, index) => (
                    <a href={logo.link || "#"} key={index}>
                        <img
                            className="w-[120px] sm:w-[140px] h-[120px] sm:h-[140px] p-5 border-2 border-transparent hover:border-gray-400 hover:shadow-xl transition-all duration-300 ease-in-out"
                            src={logo.photo || "/path/to/default-image.jpg"} // Замість порожнього рядка ставимо шлях до зображення за замовчуванням
                            alt="universityLogos"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Organizers;
