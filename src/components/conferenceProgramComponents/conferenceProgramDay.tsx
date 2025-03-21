import client from "../../../contentfulClient.tsx";
import { useQuery } from "@tanstack/react-query";

const ConferenceProgramDay = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["Schedule"],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "Schedule" });
            if (!response.items.length) return null;

            // Переконуємось, що це точно масив
            const sessions = Array.isArray(response.items[0]?.fields.Sessions) ? response.items[0].fields.Sessions : [];

            const speakerIds = sessions.flatMap(sessionRef => {
                const session = response.includes?.Entry?.find(entry => entry.sys.id === sessionRef.sys.id)?.fields;
                return Array.isArray(session?.Speakers) ? session.Speakers.map(speakerRef => speakerRef.sys.id) : [];
            });

            const speakerEntries = await client.getEntries({ 'sys.id[in]': speakerIds.join(',') });
            const speakers = speakerEntries.items.reduce((acc, item) => {
                acc[item.sys.id] = item.fields;
                return acc;
            }, {} as Record<string, any>);

            return {
                schedule: response.items[0]?.fields || null,
                includes: response.includes || { Entry: [] },
                speakers,
            };
        },
    });

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error.message}</p>;
    if (!data?.schedule) return <p>Дані не знайдено</p>;

    const { schedule, includes, speakers } = data;

    const getEntryById = (id: string) => includes.Entry.find(entry => entry.sys.id === id)?.fields || null;

    return (
        <div>
            <div className="w-[100%] bg-[#87cefa]">
                <p className="text-[22px] ml-[50px] text-[#212529] p-1 font-bold font-[inherit]">
                    <h2>{schedule.data}</h2>
                </p>
            </div>
            {schedule.Sessions?.map((sessionRef: any, index: number) => {
                const session = getEntryById(sessionRef.sys.id);
                if (!session) return null;

                return (
                    <div key={index} style={{ marginBottom: "20px", padding: "10px", borderBottom: "1px solid #ccc" }}>
                        <div className="flex space-x-5">
                            <p className="space-x-52">({session.Time})</p>
                            <p className="space-x-52">{session.title}</p>
                        </div>
                        {Array.isArray(session.Speakers) && session.Speakers.length > 0 && (
                            <div>
                                <ul>
                                    {session.Speakers.map((speakerRef: any, idx: number) => {
                                        const speaker = speakers[speakerRef.sys.id];
                                        if (!speaker) return null;
                                        return (
                                            <li className="ml-2 mt-8 space-y-5" key={idx}>
                                                <strong>{speaker.name}</strong> {speaker.title}
                                                <p>{speaker.Bio}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ConferenceProgramDay;
