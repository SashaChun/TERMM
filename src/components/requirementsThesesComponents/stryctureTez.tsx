import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";

// Типізація для об'єкта члена конференції
type ConferenceChair = {
    name: string;
    specialization: string;
    photo: string | null;
};

// Типізація для Asset з Contentful
type Asset = {
    sys: { id: string };
    fields: { file?: { url: string } | null };
};

// Типізація для Entry з Contentful
type ChairEntry = {
    sys: { id: string };
    fields: {
        pib: string;
        description: string;
        photo?: Array<{ sys: { id: string } }> | undefined;
    };
};

const Conferencechair = () => {
    const { data, error, isLoading } = useQuery<ConferenceChair[], Error>({
        queryKey: ['Conferencechair'],
        queryFn: async () => {
            // @ts-ignore
            const response = await client.getEntries<ChairEntry>({
                content_type: "ConferenceCoChairs"
            });

            if (!response.items || response.items.length === 0) return [];

            const conferenceChairs: ConferenceChair[] = response.items.map((item) => {
                const fields = item.fields;

                // Перевірка на наявність photoId
                // @ts-ignore
                const photoId = fields?.photo?.[0]?.sys?.id;

                // Перевірка, чи є response.includes та Asset, перед використанням
                const asset = photoId
                    ? response.includes?.Asset?.find((asset: Asset) => asset.sys.id === photoId)
                    : null;

                return {
                    name: fields?.pib ?? "",
                    specialization: fields?.description ?? "",
                    photo: asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : null
                };
            });

            return conferenceChairs;
        },
    });

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-wrap justify-center items-center space-y-8">
            <h1 className="text-[28px] text-center w-full">Голова конференції</h1>
            <div className="flex flex-wrap justify-center gap-10">
                {data && data.length > 0 ? (
                    data.map((member: ConferenceChair, index: number) => (
                        <div key={index} className="flex flex-col items-center text-center max-w-[350px]">
                            {member.photo ? (
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-[300px] h-[450px] object-cover shadow-lg"
                                />
                            ) : (
                                <div className="w-[300px] h-[450px] bg-gray-200 flex items-center justify-center">
                                    <span>Фото відсутнє</span>
                                </div>
                            )}
                            <p className="text-[22px] mt-5">{member.name}</p>
                            <p className="text-[18px] mt-3 w-[80%] text-center">{member.specialization}</p>
                        </div>
                    ))
                ) : (
                    <div>Немає доступних даних</div>
                )}
            </div>
        </div>
    );
};

export default Conferencechair;