import Linkify from "react-linkify";

// Типізація параметрів linkDecorator
const linkDecorator = (href: string, text: string, key: string | number) => (
    <a key={key} href={href} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
        {text}
    </a>
);

// Типізація компоненту Place
interface PlaceProps {
    place: { item: string } | { item: string }[] | { item: string }[][];
}

const Place = ({ place }: PlaceProps) => {
    console.log(place);  // Перевірка структури даних

    // Розпакування масиву, якщо він містить внутрішній масив
    const placesToRender = Array.isArray(place) && Array.isArray(place[0]) ? place.flat() : place;

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-[20px] sm:text-[30px] flex font-bold text-black text-center">
                Місце проведення конференції
            </h1>
            <div className="text-[12px] sm:text-[20px] mt-5 flex flex-col items-start text-[#212529] space-y-2">
                {Array.isArray(placesToRender) ? (
                    placesToRender.map((event, index) => (
                        <p className="mt-2" key={index}>
                            <Linkify componentDecorator={linkDecorator}>
                                {event.item}
                            </Linkify>
                        </p>
                    ))
                ) : (
                    <p>{placesToRender.item}</p>  // Якщо place не масив, вивести одиничне значення
                )}
            </div>
        </div>
    );
};

export default Place;
