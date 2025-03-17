import ContentPlace from "../components/ContentPlace.tsx";
import client from "../../contentfulClient.tsx";
import { BsPen } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loading.tsx";

const RequirementsTheses = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["requirementsForAbstractDesign"],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "requirementsForAbstractDesign" });
            return response.items;
        },
    });


    if (isLoading) return <Loader/>;    if (error instanceof Error) return <div>Не вдалося завантажити дані: {error.message}</div>;

    return (
        <div className="flex justify-center px-4 sm:px-0">
            <ContentPlace>
                <section className="w-full sm:w-[70%] mx-auto text-center">
                    <h4 className="text-[18px] sm:text-[23px] mt-2 font-semibold text-[#212529]">
                        Загальні вимоги до оформлення тез
                    </h4>

                    <ul className="list-decimal list-outside text-left mt-4 space-y-3">
                        {data.map((requirement, index) => (
                            <li key={requirement.sys.id} className="flex items-start space-x-3">
                                <BsPen className="w-5 shrink-0 mt-1.5 text-blue-600" />
                                <div className="flex items-start space-x-2">
                                    <span className="text-gray-700">{index + 1}.</span>
                                    <p className="text-[#212529] text-[16px] sm:text-[18px]">{requirement.fields.textRule}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </ContentPlace>
        </div>
    );
};

export default RequirementsTheses;