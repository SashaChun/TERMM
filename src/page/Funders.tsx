import ContentPlace from "../components/ContentPlace.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";
import Line from '../components/Line.tsx'

export default function Funders() {
    const { data, isLoading } = useQuery({
        queryKey: ['Firstfundators'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "Firstfundators" });

            const assetsMap = response.includes?.Asset?.reduce((acc: { [key: string]: string }, asset: any) => {
                acc[asset.sys.id] = asset.fields.file.url;
                return acc;
            }, {});

            return response.items.map((event: any) => ({
                name: event.fields.pib || "", // Використовуємо 'pib' замість 'name'
                description: event.fields.description || "", // Використовуємо 'description'
                photo: event.fields.photo1?.[0]?.sys?.id ? assetsMap?.[event.fields.photo1[0].sys.id] : null, // Перевірка на фото
            }));
        },
    });

    if (isLoading) return <Loader />;

    return (
        <div className={'flex justify-center'}>
            <ContentPlace>
                <section className={'flex items-center text-[#212529] flex-col mt-8'}>
                    <h1 className={'text-[20px] sm:text-[30px] text-center mx-auto font-[segoeuithibd]'}>
                        Ініціаторами проведення конференції у зазначеному форматі виступили:
                    </h1>
                    <div className={'text-[18px] sm:text-[22px] mt-3 text-center mx-auto font-[500]'}>
                        {data?.map((event, index) => (
                            <span className={'flex flex-row space-x-2'} key={index}>
                                <p>{typeof event.name === 'string' ? event.name : ''}</p>{index < data.length - 1 && ", "}
                            </span>
                        ))}
                    </div>
                    <div>
                        {data?.map((event, index) => (
                            <div key={index} className={'flex sm:flex-row flex-col mt-10 items-center space-x-5'}>
                                {/* Перевірка на наявність фото */}
                                {event.photo ? (
                                    <img className={'sm:w-[270px] sm:h-[400px] w-[200px] h-[280px]'} src={event.photo} alt='photo' />
                                ) : (
                                    <div className="w-[200px] h-[280px] bg-gray-200 flex justify-center items-center text-white">No Photo</div>
                                )}
                                <p className={"flex justify-between text-[15px] mt-3 sm:text-[18px] items-center w-full"}>
                                    {typeof event.description === 'string' ? event.description : ''}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Line />
                </section>
            </ContentPlace>
        </div>
    );
}
