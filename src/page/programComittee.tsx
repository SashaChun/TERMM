import ContentPlace from "../components/ContentPlace.tsx";
import { IoLocationSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";

// Define the interface for the Contentful data
interface ProgramCommitteeFields {
    item: string[];
}

interface ProgramCommitteeEntry {
    contentTypeId: string;
    fields: ProgramCommitteeFields;
}

const ProgramComittee = () => {
    const { data, isLoading } = useQuery<string[]>({
        queryKey: ['program-comittee'],
        queryFn: async () => {
            const response = await client.getEntries<ProgramCommitteeEntry>({
                content_type: "programcomittee"
            });
            const entry = response.items[0] as unknown as ProgramCommitteeEntry;
            return entry.fields.item;  // Return the item field (array of strings)
        },
    });

    if (isLoading) return <Loader />;

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section className="flex flex-col items-center">
                    <h1 className="text-[25px] text-[#212529] font-[500]">Програмний комітет</h1>
                    <div className="p-4 bg-gray-100 text-[#212529] text-[12px] md:text-[18px]">
                        {data && data.map((professor: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2 mt-5 mb-2">
                                <IoLocationSharp className="w-5 text-blue-800 shrink-0"/>
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