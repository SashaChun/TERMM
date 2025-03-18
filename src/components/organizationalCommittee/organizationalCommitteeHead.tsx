import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";

const OrganizationalCommitteeHead = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['organizingheadcommittee'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "organizingheadcommittee" });
            const organizingHead = response.items[0].fields;
            const asset = response.includes.Asset.find((asset: any) => asset.sys.id === organizingHead.photo[0].sys.id);

            return {
                name: organizingHead.pib,
                description: organizingHead.description,
                photoUrl: asset.fields.file.url,
            };
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={'flex items-center flex-col'}>
            <h1 className={'text-[30px] font-[500] mt-5'}>Організаційний комітет</h1>
            <img
                className={'w-[250px] mt-5'}
                src={data?.photoUrl}
                alt={data?.name}
            />
            <h3 className={'text-[18px] mt-2'}>{data?.name}</h3>
            <p className={'text-blue-600 mt-2'}>{data?.description}</p>
        </div>
    );
}

export default OrganizationalCommitteeHead;
