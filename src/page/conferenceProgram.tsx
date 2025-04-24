import ContentPlace from "../components/ContentPlace.tsx";
import logo from '../assets/Logo.png';
import Line from "../components/Line.tsx";
import lntuLoog from '../assets/lntu.png';
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import ConferenceProgramDay from "../components/conferenceProgramComponents/conferenceProgramDay.tsx";

type ConferenceProgramData = {
    place: string;
    meetingId: string;
    passcode: string;
    daytime1: string[];
    daywork1: string[];
    day2: string;
    daytime2: string[];
    daywork2: string[];
};

const ConferenceProgram = () => {
    const { data, error, isLoading } = useQuery<ConferenceProgramData>({
        queryKey: ['conference-program-days'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "conference-program-days" });
            console.log(response)
            return response.items[0]?.fields as ConferenceProgramData;
        },
    });
    console.log(data)
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;
    if (!data) return <p>No data available</p>;

    return (
        <div className="flex items-center justify-center">
            <ContentPlace>
                <section className="p-5">
                    <div className="flex xl:flex-row flex-col text-[#212529] items-center">
                        <img className="w-[550px] mt-2" src={logo} alt="logo"/>
                        <p className="mt-5 text-[18px] font-bold font-[inherit] mx-auto">
                            10- а Міжнародна конференція
                            «Теоретичні і експериментальні дослідження в сучасних технологіях
                            матеріалознавства та машинобудування» 27 - 30 травня, 2025 | ЛНТУ,
                            Луцьк, Україна
                            Там де програми все видалити. Це заповнемо після реєстрації
                            учасниками
                        </p>
                    </div>
                    <Line/>
                    <div className="w-[100%] bg-[#87cefa]">
                        <p className="text-[22px] ml-[50px] text-[#212529] p-1 font-bold font-[inherit]">Програма</p>
                    </div>
                    <div>
                        <div className="flex justify-between items-end">
                            <div className="flex space-x-5 mt-5">
                                <div>
                                    <img className="w-[120px] h-[100px]" src={lntuLoog} alt="lntuLoog"/>
                                </div>
                                <div>
                                    <p><span className="font-bold">Місце проведення:</span> {data.place}</p>
                                    <p className="font-bold">Лінк в Zoom</p>
                                    <p>Meeting ID: {data.meetingId}</p>
                                    <p>Passcode: {data.passcode}</p>
                                    <p>(єдиний лінк на всі дні)</p>
                                </div>
                            </div>
                        </div>
                        <Line/>
                        <div className="mt-5">
                            {Array.isArray(data.daytime1) && data.daytime1.map((time, index) => (
                                <div key={index} className="flex justify-between border-b py-2">
                                    <p className="font-bold">{time}</p>
                                    <p>{data.daywork1[index]}</p>
                                </div>
                            ))}
                        </div>
                        <Line/>
                        <div className="font-bold text-end">{data.day2}</div>
                        <Line/>
                        <div className="mt-5">
                            {Array.isArray(data.daytime2) && data.daytime2.map((time, index) => (
                                <div key={index} className="flex justify-between border-b py-2">
                                    <p className="font-bold">{time}</p>
                                    <p>{data.daywork2[index]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex mt-8 xl:flex-row flex-col text-[#212529] items-center">
                        <img className="w-[550px] mt-2" src={logo} alt="logo"/>
                        <p className="mt-5 text-[18px] font-bold font-[inherit] mx-auto">
                            9-та Міжнародна конференція «Теоретичні і експериментальні дослідження в сучасних
                            технологіях матеріалознавства та машинобудування»
                            30 - 31 травня, 2023 | ЛНТУ, Луцьк, Україна
                        </p>
                    </div>
                    <Line/>
                    <ConferenceProgramDay/>
                </section>
            </ContentPlace>
        </div>
    );
};

export default ConferenceProgram;