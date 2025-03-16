import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";

const Conferencechair = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['Conferencechair'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "conference-co-chairs" });
             const conferenceChairs = response.items[0].fields.Conferencechair;
            const entries = response.includes.Entry;
            const assets = response.includes.Asset;
            return conferenceChairs.map(chair => {
                const entry = entries.find(entry => entry.sys.id === chair.sys.id);
                const asset = assets.find(asset => asset.sys.id === entry.fields.photo[0].sys.id);
                return {
                    name: entry.fields.name.content[0].value,
                    specialixatio: entry.fields.specialixatio,
                    photo: asset.fields.file.url
                };
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={'flex flex-wrap justify-center items-center space-y-8'}>
            <h1 className={'text-[28px] text-center w-full'}>Голова конференції</h1>
            <div className={'flex flex-wrap justify-center gap-10'}>
                {data?.map((member, index) => (
                    <div key={index} className={'flex flex-col items-center text-center max-w-[350px]'}>
                        <img
                            src={member?.photo}
                            alt={member?.name}
                            className={'w-[300px] h-[450px] object-cover   shadow-lg'}
                        />
                        <p className={'text-[22px] mt-5'}>{member?.name}</p>
                        <p className={'text-[18px] mt-3 w-[80%] text-center'}>{member?.specialixatio}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Conferencechair;
