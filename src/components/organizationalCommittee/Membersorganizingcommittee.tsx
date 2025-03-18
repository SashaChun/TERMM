import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";

const Membersorganizingcommittee = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['Membersorganizingcommittee'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "Membersorganizingcommittee" });
            const deputies = response.items.map((event) => ({
                name: event.fields.pib,
            }));
            return deputies;
        },
    });

    console.log(data)
    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1 className={'text-[30px] text-center font-[500] mt-5'}>Члени</h1>
            <div className={'flex flex-wrap justify-center mt-5 gap-20'}>
                {data?.map((event, index) => (
                    <div key={index} className={'flex items-center flex-col'}>
                        {event.photoUrl ? (
                            <img className={'w-[250px] h-[350px] mt-5'} src={`https:${event.photoUrl}`} alt={event.name} />
                        ) : (
                            <div className="w-[250px] h-[350px] mt-5 bg-gray-300 flex items-center justify-center">
                                <p>No photo available</p>
                            </div>
                        )}
                        <h3 className={'text-[18px] mt-2'}>{event.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Membersorganizingcommittee;
