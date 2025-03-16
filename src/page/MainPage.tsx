import Slider from "../components/MainPageComponents/Slider.tsx";
import Place from "../components/MainPageComponents/place.tsx";
import Map from "../components/MainPageComponents/Map.tsx";
import Organizers from "../components/MainPageComponents/Organizers.tsx";
import ContentPlace from "../components/ContentPlace.tsx";
import Line from "../components/Line.tsx";
import {useQuery} from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";

const MainPage = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['mainPage'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "main-page" });
             const assetMap = response.includes.Asset.reduce((acc, asset) => {
                acc[asset.sys.id] = {
                    url: asset.fields.file.url,
                    title: asset.fields.title
                };
                return acc;
            }, {});

            return response.items.map((event) => ({
                sliderPics: event.fields.sliderPics?.map((pic) => assetMap[pic.sys.id]) || [],
                places: event.fields.places || "",
                meta : event.fields.meta
            }));
        },
    });


    console.log(data)

    return (
        <>
            <main className="flex flex-row justify-center px-5">
                <ContentPlace>
                    <div className={'items-center flex justify-center w-[100%]'}>
                        <Slider photo={data}/>
                    </div>
                    <hr className="w-full border-t border-gray-300 my-10"/>
                    <Place place={data}/>
                    <div className={'px-52 mt-10'}>
                        <Map/>
                    </div>
                    <div className={'px-52 mt-10'}>
                        <Map/>
                    </div>
                    <Line/>
                    <div className={'text-[20px] flex justify-center items-center p-5 text-justify text-[#212529]'}>
                        {data && data.map((event, index) => (<p key={index}>
                            {event.meta}
                        </p>))}
                    </div>
                    <Line/>
                    <Organizers/>
                </ContentPlace>
            </main>
        </>
    );
}

export default MainPage;
