import Slider from "../components/MainPageComponents/Slider.tsx";
import Place from "../components/MainPageComponents/place.tsx";
import Map from "../components/MainPageComponents/Map.tsx";
import Organizers from "../components/MainPageComponents/Organizers.tsx";
import ContentPlace from "../components/ContentPlace.tsx";
import Line from "../components/Line.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";
import videoMain from '../assets/mainVideo.mp4'

const MainPage = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['mainPage'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "mainpage" });
            const assetMap = response.includes?.Asset?.reduce((acc, asset) => {
                if (asset.fields?.file && asset.fields?.title) {  // Перевірка на undefined
                    acc[asset.sys.id] = {
                        url: asset.fields.file.url,
                        title: asset.fields.title
                    };
                }
                return acc;
            }, {} as Record<string, { url: string, title: string }>);

            return response.items.map((event: any) => ({
                sliderPics: event.fields.slides?.map((pic: any) => assetMap?.[pic.sys.id]) || [],  // Перевірка на undefined
                places: event.fields.places?.map((place: any) => ({ item: place })) || [],
                meta: event.fields.purpose,
                cord1: event.fields.cord1,
                cord2: event.fields.cord2,
            }));
        },
    });

    const place = data?.map((event) => event.places);
    const cord1 = data?.map((event) => ({
        lat: event.cord1?.cord1?.lat,
        lng: event.cord1?.cord1?.lon
    }));
    const cord2 = data?.map((event) => ({
        lat: event.cord2?.cord2?.lat,
        lng: event.cord2?.cord2?.lon
    }));

    console.log('cord' , 1 ,data && data[0].cord1);

    if (isLoading) return <Loader />;


    return (
        <>
            <main className="flex flex-col justify-center  items-center">

                    <div className="relative z-10  w-full h-[60vh]  overflow-hidden">
                        <video
                            src={videoMain}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>

                <ContentPlace>
                    <div className={'flex flex-col justify-center '}>
                        <div className={'items-center flex justify-center w-[100%]'}>
                        </div>
                        <hr className="w-full border-t border-gray-300 my-10"/>
                        <Place place={place || []}/>
                        <div className={'mt-10 space-y-10'}>
                           <Map/>
                        </div>
                        <Line/>
                        <div
                            className={'text-[12px] sm:text-[20px] flex justify-center items-center p-5 text-justify text-[#212529]'}>
                            {data && data.map((event, index) => (
                                <p key={index}>{String(event.meta)}</p>
                            ))}
                        </div>
                        <Line/>
                        <Organizers/>
                    </div>
                </ContentPlace>
            </main>
        </>
    );
}

export default MainPage;
