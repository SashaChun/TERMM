import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import OrganizersList from "../components/organizationalCommittee/OrganizersList.tsx";

interface Organizer {
    name: string;
    position: string;
    imageUrl: string | null;
    number: string | null;
    email: string | null;
    phone: string | null;
}

const OrganizationalCommittee = () => {
    const { data, error, isLoading } = useQuery<Organizer[]>({
        queryKey: ["orcomitet"],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "orcomitet" });

            return response.items.map((item) => {
                const fields = item.fields as {
                    pib?: string;
                    description?: string;
                    photo?: any[];
                    phone?: string;
                    email?: string;
                };

                const imageFile = fields.photo?.[0]?.fields?.file?.url;

                return {
                    name: typeof fields.pib === "string" ? fields.pib : "Без імені",
                    position: typeof fields.description === "string" ? fields.description.trim() : "Без опису",
                    imageUrl: imageFile ? `https:${imageFile}` : null,
                    phone: typeof fields.phone === "string" ? fields.phone : null,
                    email: typeof fields.email === "string" ? fields.email : null,
                };
            });
        },
    });

    console.log(data && data[0]);
    if (isLoading) return <p className="text-center">Завантаження...</p>;
    if (error) return <p className="text-center text-red-600">Помилка: {error.message}</p>;

    return (
        <section className="bg-white text-black p-6 rounded-xl shadow-md max-w-5xl mx-auto my-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Організаційний комітет</h2>

            <div className="space-y-6">
                {data?.map((member: Organizer, index: number) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            {member.imageUrl ? (
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                    Немає фото
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm">{member.position}</p>
                            {member.email && (
                                <p className="text-sm">
                                    <strong>Email:</strong>{" "}
                                    <a href={`mailto:${member.email}`} className="text-blue-600 underline">
                                        {member.email}
                                    </a>
                                </p>
                            )}
                            {member.phone && (
                                <p className="text-sm">
                                    <strong>Телефон:</strong>{" "}
                                    <a href={`tel:${member.phone}`} className="text-blue-600 underline">
                                        {member.phone}
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="text-2xl mt-10 font-bold mb-6 text-center">Члени організаційного комітету:</h2>
            <OrganizersList />
        </section>
    );
};

export default OrganizationalCommittee;
