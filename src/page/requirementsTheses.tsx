import ContentPlace from "../components/ContentPlace.tsx";
import client from "../../contentfulClient.tsx";
import { BsPen } from "react-icons/bs";
import { useQuery } from '@tanstack/react-query';

const RequirementsTheses = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['requirementsForAbstractDesign'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "requirementsForAbstractDesign" });
            return response.items;
        },
    });

    if (isLoading) return <div>Завантаження...</div>;
    if (error instanceof Error) return <div>Не вдалося завантажити дані: {error.message}</div>;

    console.log(data)

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section className="w-[70%] mx-auto text-center">
                    <h4 className="text-[24px] mt-2 font-semibold text-[#212529]">Загальні вимоги до оформлення тез</h4>

                    <ul className="list-decimal list-outside text-left mt-4">
                        {data.map((requirement, index) => (
                            <ul key={requirement.sys.id} className="flex items-start mt-5 space-x-3">
                                <BsPen className="w-5 shrink-0 mt-1.5 text-blue-600" />
                                <div className={'flex items-start space-x-2'}>
                                    <span className="text-gray-700">{index + 1}.</span>
                                    <p className="text-[#212529] text-[18px]">{requirement.fields.textRule}</p>
                                </div>
                            </ul>
                        ))}
                    </ul>
                </section>
            </ContentPlace>
        </div>
    );
};

export default RequirementsTheses;
