// @ts-nocheck

import ContentPlace from "../components/ContentPlace.tsx";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import { Entry } from "contentful";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

interface Conference {
    fields: {
        id: number;
        title: string;
        data: string;
        description?: string;
        photo?: { fields: { file: { url: string } } }[];
        videos?: string[];
    };
}

const isEmbedLink = (url: string) => {
    return url.includes("youtube.com") || url.includes("vimeo.com");
};

const HistoryPage = () => {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    const { data, error, isLoading } = useQuery<Conference[]>({
        queryKey: ['historys'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "history" });
            const assets = response.includes?.Asset || [];

            return response.items.map((item: Entry<any>) => {
                // Отримуємо URL для відео
                const videoAssetRefs = item.fields.vider || [];
                const videos = videoAssetRefs.map((ref: any) => {
                    const asset = assets.find((a: any) => a.sys.id === ref.sys.id);
                    return asset ? `https:${asset.fields.file.url}` : null;
                }).filter(Boolean);

                // Отримуємо URL для фото
                const photos = (item.fields.photo || []).map((ref: any) => {
                    const asset = assets.find((a: any) => a.sys.id === ref.sys.id);
                    return asset ? `https:${asset.fields.file.url}` : null;
                }).filter(Boolean);

                return {
                    fields: {
                        id: item.fields.id,
                        title: item.fields.title,
                        data: item.fields.data,
                        description: item.fields.description,
                        photos,
                        videos,
                    },
                };
            }) as Conference[];
        },
    });

    if (isLoading) return <div>Завантаження...</div>;
    if (error instanceof Error) return <div>Не вдалося завантажити дані: {error.message}</div>;
    if (!data) return <div>Дані не завантажені</div>;

    const current = data.find((conference) => conference.fields.id === parseInt(lastSegment))?.fields;

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section>
                    <div className="mt-4 flex items-center flex-col">
                        <h4 className="w-[70%] text-[30px] uppercase font-semibold text-[#212529] font-[inherit] text-center mx-auto">
                            {current?.title || "Назва відсутня"}
                        </h4>
                        <p className="text-[20px] flex items-center mt-2 font-semibold text-[#212529] text-center mx-auto">
                            {current?.data || "Дані відсутні"}
                        </p>

                        {/* RichText опис */}
                        <div className="mt-6" dangerouslySetInnerHTML={{
                            __html: documentToHtmlString(current?.description || "")
                        }} />

                        <div className="flex items-center flex-col mt-10">
                            {current?.photos?.length ? (
                                current.photos.map((p, index) => (
                                    <img
                                        key={index}
                                        src={p}
                                        alt={`Зображення ${index + 1}`}
                                        className="w-[600px] h-[250px] md:h-[480px] mt-10 object-cover shadow"
                                    />
                                ))
                            ) : (
                                <p>Зображення відсутні</p>
                            )}

                            {current?.videos?.length ? (
                                current.videos.map((video, index) => (
                                    isEmbedLink(video) ? (
                                        <div key={index} className="w-[600px] h-[340px] mt-10 shadow">
                                            <iframe
                                                src={video}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Embedded Video"
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <div key={index} className="w-[600px] h-[340px] mt-10 shadow">
                                            <video
                                                src={video}
                                                controls
                                                className="w-full h-full object-cover"
                                            >
                                                Ваш браузер не підтримує відео.
                                            </video>
                                        </div>
                                    )
                                ))
                            ) : (
                                <p className="mt-4">Відео відсутнє</p>
                            )}
                        </div>
                    </div>
                </section>
            </ContentPlace>
        </div>
    );
};

export default HistoryPage;
