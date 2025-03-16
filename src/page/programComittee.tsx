import ContentPlace from "../components/ContentPlace.tsx";
import { IoLocationSharp } from "react-icons/io5";
import {useQuery} from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";


const ProgramComittee = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['program-comittee'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "programcomittee" });
            return response.items[0].fields.item;
        },
    });

    console.log(data)

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section className="flex flex-col items-center">
                    <h1 className="text-[25px] text-[#212529] font-[500]">Програмний комітет</h1>
                    <div className="p-4 bg-gray-100 text-[#212529] text-[18px]">
                        {data && data.map((professor, index) => (
                            <div key={index} className="flex items-center space-x-2 mt-5 mb-2">
                                <IoLocationSharp className="w-5 shrink-0"/>
                                <p className="text-gray-800">{professor}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </ContentPlace>
        </div>
    );

}

export default ProgramComittee;