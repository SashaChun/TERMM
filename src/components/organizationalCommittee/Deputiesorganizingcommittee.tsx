import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";

const Deputiesorganizingcommittee = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['Deputiesorganizingcommittee'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "Deputiesorganizingcommittee" });
            const deputies = response.items.map((item: any) => {
                const deputy = item.fields;
                const photoAsset = response.includes.Asset.find((asset: any) => asset.sys.id === deputy.photo[0].sys.id);
                return {
                    name: deputy.pib,
                    email: deputy.email,
                    photoUrl: photoAsset.fields.file.url,
                };
            });
            return deputies;
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1 className={'text-[30px] text-center font-[500] mt-5'}>Організаційний комітет</h1>
            <div className={'flex md:flex-row justify-center items-center flex-col mt-5 space-x-0 md:space-x-20'}>
                {data?.map((deputy, index) => (
                    <div key={index} className={'flex items-center flex-col'}>
                        <img className={'w-[250px] mt-5'} src={deputy.photoUrl} alt={deputy.name} />
                        <h3 className={'text-[18px] mt-2'}>{deputy.name}</h3>
                        <p className={'text-blue-600 mt-2'}>{deputy.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Deputiesorganizingcommittee;
