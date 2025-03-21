import Linkify from "react-linkify";
import ContentPlace from "../components/ContentPlace.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";

// Define types for Contentful data
interface PartnerItem {
    id: string;
    photo: string | undefined;  // photo can be undefined
    description: string;
}

interface ContentfulResponse {
    items: Array<{
        sys: { id: string };
        fields: {
            photo?: Array<{ sys: { id: string } }>;
            description?: string;
        };
    }>;
    includes?: {
        Asset: Array<{
            sys: { id: string };
            fields: { file: { url: string } };
        }>;
    };
}

const InfoPartners = () => {
    const { data, error, isLoading } = useQuery<PartnerItem[], Error>({
        queryKey: ['info-partners'],
        queryFn: async () => {
            const response: ContentfulResponse = await client.getEntries({
                content_type: "info-partners"
            });

            const assetsMap = new Map(
                response.includes?.Asset?.map(asset => [asset.sys.id, asset.fields.file.url]) || []
            );

            return response.items.map(item => ({
                id: item.sys.id,
                // Ensure a fallback for photo, so it's never undefined
                photo: assetsMap.get(item.fields.photo?.[0]?.sys.id) || "",
                description: item.fields.description || ""
            }));
        },
    });

    if (isLoading) return <Loader />;
    if (error instanceof Error) return <div>Помилка: {error.message}</div>;

    const linkDecorator = (href: string, text: string, key: string) => (
        <a key={key} href={href} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section>
                    <h1 className="text-center mx-auto font-[500] text-[#212529] text-[18px] mt-2 sm:text-[23px]">
                        За рішенням оргкомітету конференції, наукові статті будуть рекомендовані до друку в наступних наукових виданнях:
                    </h1>
                    {data?.map((event) => (
                        <div key={event.id} className="flex flex-col md:flex-row mt-10 items-center gap-6">
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
