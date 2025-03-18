import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";

const Conferencechair = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['Conferencechair'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "ConferenceCoChairs" });

            // Переконаємось, що є потрібні дані
            if (!response.items || response.items.length === 0) return [];

            const conferenceChairs = response.items;
            const assets = response.includes?.Asset || [];

            return conferenceChairs.map(chair => {
                const photoId = chair.fields.photo?.[0]?.sys?.id;
                const asset = assets.find(asset => asset.sys.id === photoId);
                return {
                    name: chair.fields.pib,
                    specialization: chair.fields.description,
                    photo: asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : null
                };
            });
        },
    });

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data)

    return (
        <div className="flex flex-wrap justify-center items-center space-y-8">
            <h1 className="text-[28px] text-center w-full">Голова конференції</h1>
            <div className="flex flex-wrap justify-center gap-10">
                {data?.map((member, index) => (
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
                ))}
            </div>
        </div>
    );
};

export default Conferencechair;
