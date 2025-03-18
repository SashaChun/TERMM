import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

const Map = ({lat, lng}) => {
    const lntuCoordinates = { lat, lng };
    return (
        <div className="w-[100%] flex justify-center h-[200px] sm:h-[500px]">
            <div className={'w-[70%] rounded-[100px]'}>
                <LoadScript googleMapsApiKey="AIzaSyB7MTh5c51klBZJ9wWGyDvpHLTVdUc9Fcc">
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={lntuCoordinates}
                        zoom={18}
                        mapTypeId="roadmap"
                        options={{
                            disableDefaultUI: true,
                            zoomControl: true,
                            streetViewControl: true,
                            mapTypeControl: true,
                        }}
                    >
                        <Marker position={lntuCoordinates} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default Map;
