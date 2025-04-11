import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";

const OrganizersList = () => {
    const { data, error, isLoading } = useQuery<string[]>({
        queryKey: ["oranicatorsPeopl"],
        queryFn: async () => {
            const response = await client.getEntries({
                content_type: "oranicatorsPeopl",
            });

            // Явно перевіряємо, що `pib` є масивом рядків
            const fields = response.items[0]?.fields;
            if (!fields || !Array.isArray(fields.pib)) {
                throw new Error("Неправильна структура даних");
            }

            return fields.pib as string[];
        },
    });

    if (isLoading) return <p>Завантаження...</p>;
    if (error || !data) return <p>Сталася помилка!</p>;

    return (
        <section className="text-black p-6 rounded-xl  max-w-5xl mx-auto my-8">
            <ul className="space-y-4 list-disc pl-6">
                {data.map((person: string, index: number) => (
                    <li key={index} className="text-base">{person}</li>
                ))}
            </ul>
        </section>
    );
};

export default OrganizersList;
