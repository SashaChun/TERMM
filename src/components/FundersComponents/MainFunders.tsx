import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/languageSlice.ts';

const MainFunders = () => {
    const lng = useSelector(selectLanguage);
    console.log(lng);

    const { data, error, isLoading } = useQuery({
        queryKey: ['Firstfundators' , lng],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "Firstfundators" , locale: lng });
            return response;
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;
    if (!data?.items || data.items.length === 0) return <p>No data found</p>;

    return (
        <div className="max-w-4xl mx-auto">
            {data.items.map((item) => (
                <div key={item.sys.id}>
                    <p className="text-lg text-gray-700 text-center">
                        {typeof item.fields.text === "string" ? item.fields.text : JSON.stringify(item.fields.text)}
                    </p>
                    <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center items-center">
                        {Array.isArray(item.fields.photo1) &&
                            item.fields.photo1
                                .filter(
                                    (photo): photo is { sys: { id: string } } =>
                                        typeof photo === "object" &&
                                        photo !== null &&
                                        "sys" in photo &&
                                        typeof photo.sys === "object" &&
                                        photo.sys !== null &&
                                        "id" in photo.sys
                                )
                                .map((photo) => {
                                    const asset = data.includes?.Asset?.find(a => a.sys.id === photo.sys.id);
                                    return asset ? (
                                        <img
                                            key={asset.sys.id}
                                            src={asset.fields.file?.url ? "https:" + asset.fields.file.url : ""}
                                            alt={asset.fields.title || "Image"}
                                            className="w-64 h-80 object-cover shadow-md"
                                        />
                                    ) : null;
                                })
                        }

                    </div>
                </div>
            ))}

        </div>
    );
};

export default MainFunders;
