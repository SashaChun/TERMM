import {useQuery} from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";

const ManagementTeamFields = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['managementteam-capitan'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "managementteam" });
            return response.items.map((item) => {
                const person = item.fields.item.fields;
                const name = person.name.content[0].content[0].value;
                const specialization = person.specialixatio; // Assuming it's correct
                const photoId = person.photo[0].sys.id;
                const photo = response.includes.Asset.find(asset => asset.sys.id === photoId)?.fields.file.url;
                return { name, specialization, photo };
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data)

    return <div className={'flex items-center flex-col text-center'}>
        <h1 className={'text-[28px] flex text-center'}>Голова конференції</h1>
        <img src={data[0]?.photo} alt="VahovychPhoto" className={'w-[300px] h-[450px] mt-8'}/>
        <p className={'text-[22px] mt-5 '}>{data[0]?.name}</p>
        <p className={'flex text-[18px] mt-5 w-[70%] text-center flex-col'}>{data[0]?.specialization}</p>
    </div>
}

export default ManagementTeamFields