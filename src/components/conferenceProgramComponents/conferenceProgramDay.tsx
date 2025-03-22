import client from "../../../contentfulClient.tsx";
import { useQuery } from "@tanstack/react-query";

const isEntryLink = (obj: any): obj is { sys: { id: string } } => {
    return obj && typeof obj === "object" && "sys" in obj && obj.sys && typeof obj.sys.id === "string";
};

const ConferenceProgramDay = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["Schedule"],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "Schedule" });
            if (!response.items.length) return null;

            // Переконуємося, що Sessions – це масив
            const sessions = Array.isArray(response.items[0]?.fields.Sessions)
                ? response.items[0].fields.Sessions
                : [];

            const speakerIds: string[] = sessions.flatMap(sessionRef => {
                if (!isEntryLink(sessionRef)) return []; // Перевірка типу перед доступом до sys.id

                const session = response.includes?.Entry?.find(entry =>
                    entry.sys.id === sessionRef.sys.id
                )?.fields;

                return Array.isArray(session?.Speakers)
                    ? session.Speakers.flatMap(speakerRef =>
                        isEntryLink(speakerRef) ? [speakerRef.sys.id] : []
                    )
                    : [];
            });

            const speakerEntries = await client.getEntries({ 'sys.id[in]': speakerIds });
            const speakers = speakerEntries.items.reduce((acc, item) => {
                acc[item.sys.id] = item.fields;
                return acc;
            }, {} as Record<string, any>);

            return {
                schedule: response.items[0]?.fields || null,
                includes: response.includes ?? { Entry: [] },
                speakers,
            };
        },
    });

    if (isLoading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error.message}</p>;
    if (!data?.schedule) return <p>Дані не знайдено</p>;

    const { schedule, includes, speakers } = data;

    const getEntryById = (id: string) =>
        includes?.Entry?.find(entry => entry.sys.id === id)?.fields ?? null;

    return (
        <div>
            <div className="w-[100%] bg-[#87cefa]">
                <p className="text-[22px] ml-[50px] text-[#212529] p-1 font-bold font-[inherit]">
                    <h2>{String(schedule.data ?? "")}</h2>
                </p>
            </div>
            {Array.isArray(schedule.Sessions) &&
                schedule.Sessions.map((sessionRef: any, index: number) => {
                    if (!isEntryLink(sessionRef)) return null; // Додаткова перевірка перед доступом до sessionRef.sys.id

                    const session = getEntryById(sessionRef.sys.id);
                    if (!session) return null;

                    return (
                        <div key={index} style={{ marginBottom: "20px", padding: "10px", borderBottom: "1px solid #ccc" }}>
                            <div className="flex space-x-5">
                                <p className="space-x-52">({String(session.Time ?? "")})</p>
                                <p className="space-x-52">{String(session.title ?? "")}</p>
                            </div>
                            {Array.isArray(session.Speakers) && session.Speakers.length > 0 && (
                                <div>
                                    <ul>
                                        {session.Speakers.map((speakerRef: any, idx: number) => {
                                            if (!isEntryLink(speakerRef)) return null;
                                            const speaker = speakers[speakerRef.sys.id];
                                            if (!speaker) return null;
                                            return (
                                                <li className="ml-2 mt-8 space-y-5" key={idx}>
                                                    <strong>{String(speaker.name ?? "")}</strong> {String(speaker.title ?? "")}
                                                    <p>{String(speaker.Bio ?? "")}</p>
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
