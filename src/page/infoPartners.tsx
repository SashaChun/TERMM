import ContentPlace from "../components/ContentPlace.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";
import Linkify from 'react-linkify';
type Asset = {
    sys: {
        id: string;
    };
    fields: {
        file: {
            url: string;
        };
    };
};

type EntryFields = {
    name?: string;
    description?: string;
    photo?: { sys: { id: string } }[];
};

type Entry = {
    fields: EntryFields;
};

type ContentfulResponse = {
    items: Entry[];
    includes?: {
        Asset?: Asset[];
    };
};

const InfoPartners = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['info-partners'],
        queryFn: async () => {
            const response = await client.getEntries({
                content_type: "info-partners"
            }) as unknown as ContentfulResponse;

            const assetsMap = new Map<string, string>();
            response.includes?.Asset?.forEach(asset => {
                if (asset.fields.file) {
                    assetsMap.set(asset.sys.id, asset.fields.file.url);
                }
            });

            return response.items.map(item => ({
                name: item.fields.name ?? "Без назви",
                description: item.fields.description ?? "Опис відсутній",
                photo: item.fields.photo?.[0]?.sys?.id ? assetsMap.get(item.fields.photo[0].sys.id) || "" : "",

            }));
        },
    });

    if (isLoading) return <Loader />;
    if (error instanceof Error) return <div>Помилка завантаження даних: {error.message}</div>;

    const linkDecorator = (href: string, text: string, key: number) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section>
                    <h1 className="text-center mx-auto font-[500] text-[#212529] text-[18px] mt-2 sm:text-[23px]">
                        За рішенням оргкомітету конференції, наукові статті будуть рекомендовані до друку в наступних
                        наукових виданнях:
                    </h1>
                    {data?.map((event , index) => (
                        <div key={index} className="flex flex-col md:flex-row mt-10 items-center gap-6">
                            <img
                                src={event.photo || "/path/to/placeholder-image.jpg"}
                                alt="Journal Cover"
                                className="w-[200px] h-[280px] object-cover shadow-md rounded"
                            />
                            <div className="text-gray-700">
                                <Linkify componentDecorator={linkDecorator}>
                                    <p>{event.description}</p>
                                </Linkify>
                            </div>
                        </div>
                    ))}
                </section>
            </ContentPlace>
        </div>
    );
};

export default InfoPartners;
