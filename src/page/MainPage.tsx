import Slider from "../components/MainPageComponents/Slider.tsx";
import Place from "../components/MainPageComponents/place.tsx";
import Map from "../components/MainPageComponents/Map.tsx";
import Organizers from "../components/MainPageComponents/Organizers.tsx";
import ContentPlace from "../components/ContentPlace.tsx";
import Line from "../components/Line.tsx";
import {useQuery} from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import Loader from "../components/Loading.tsx";

const MainPage = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['mainPage'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "mainpage" });
            const assetMap = response.includes.Asset.reduce((acc, asset) => {
                acc[asset.sys.id] = {
                    url: asset.fields.file.url,
                    title: asset.fields.title
                };
                return acc;
            }, {});

            return response.items.map((event) => ({
                sliderPics: event.fields.slides?.map((pic) => assetMap[pic.sys.id]) || [],
                places: event.fields.places.map((place) => ({ item: place })),
                meta : event.fields.purpose,
                cord1 : event.fields,
                cord2 : event.fields
            }));
        },
    });

    const place = data?.map((event) => event.places);
    const cord1 = data?.map((event) => ({
        lat: event.cord1.cord1.lat,
        lng: event.cord1.cord1.lon
    }));

    const cord2 = data?.map((event) => ({
        lat: event.cord2.cord2.lat,
        lng: event.cord2.cord2.lon
    }));



    if (isLoading) return <Loader/>;

    return (
        <>
            <main className="flex flex-row justify-center px-5">
                <ContentPlace>
                    <div className={'items-center flex justify-center w-[100%]'}>
                        <Slider photo={data}/>
                    </div>
                    <hr className="w-full border-t border-gray-300 my-10"/>
                    <Place place={place}/>
                    <div className={'mt-10 space-y-10'}>
                        {cord1?.map((coords, index) => (
                            <Map key={index} lat={coords.lat} lng={coords.lng}/>
                        ))}
                        {cord2?.map((coords, index) => (
                            <Map key={index} lat={coords.lat} lng={coords.lng}/>
                        ))}
                    </div>
                    <Line/>
                    <div className={'text-[12px] sm:text-[20px] flex justify-center items-center p-5 text-justify text-[#212529]'}>
                        {data && data.map((event, index) => (<p key={index}>{event.meta}</p>))}
                    </div>
                    <Line/>
                    <Organizers/>
                </ContentPlace>
            </main>
        </>
    );
}

export default MainPage;
