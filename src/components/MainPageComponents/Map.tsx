import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FC } from "react";

// Фікс іконок Leaflet, інакше вони не показуються
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

interface MapProps {
    lat: number;
    lng: number;
}

const Map: FC<MapProps> = ({lat, lng}) => {
    // Встановлюємо координати, передані в якості пропсів
    const coordinates: [number, number] = [lat, lng];

    return (
        <div className="w-full flex justify-center h-[200px] sm:h-[500px] my-5">
            <div className="w-[70%] rounded-[10px] overflow-hidden shadow-lg">
                <MapContainer
                    center={coordinates}
                    zoom={18}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coordinates}>
                        <Popup>📍 Точка події</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};
