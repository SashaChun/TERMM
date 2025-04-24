import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";
import {useSelector} from 'react-redux'
import {  selectLanguage } from '../../store/languageSlice'

interface Asset {
    sys: {
        id: string;
    };
    fields: {
        file?: {
            url: string;
        };
    };
}

const ManagementTeamFields = () => {
    const lng = useSelector(selectLanguage);
    const { data, error, isLoading } = useQuery({
        queryKey: ['managementteam-capitan'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "Chairman-conference" });

            return response.items.map((item) => {
                const person = item.fields;
                const name = person.pib;
                const specialization = person.description;

                // @ts-ignore
                const photoId = Array.isArray(person.photo) && person.photo[0] && 'sys' in person.photo[0]
                    ? (person.photo[0] as Asset).sys.id
                    : undefined;

// @ts-ignore
                const photo = response.includes?.Asset?.find((asset: Asset) => asset.sys.id === photoId)?.fields?.file?.url;

                return { name, specialization, photo };
            });
        },
    });

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={'flex items-center flex-col text-center'}>
            <h1 className={'text-[28px] flex text-center'}>
            {lng === 'uk' && 'Голова конференції: '}
            {lng === 'en-US' && 'Conference Chair'}
            </h1>
            <img src={data?.[0]?.photo ?? ''} alt="VahovychPhoto" className={'w-[300px] h-[450px] mt-8'} />
            <p className={'text-[22px] mt-5 '}>{typeof data?.[0]?.name === 'string' ? data[0]?.name : ''}</p>
            <p className={'flex text-[18px] mt-5 w-[70%] text-center flex-col'}>{typeof data?.[0]?.specialization === 'string' ? data[0]?.specialization : ''}</p>
        </div>
    );
};

export default ManagementTeamFields;
