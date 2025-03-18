import Linkify from "react-linkify";

const linkDecorator = (href, text, key) => (
    <a key={key} href={href} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
        {text}
    </a>
);
const Place = ({ place }) => {
    console.log(place);  // Перевірка структури даних
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-[20px] sm:text-[30px] flex font-bold text-black text-center">
                Місце проведення конференції
            </h1>
            <div className="text-[12px] sm:text-[20px] mt-5 flex flex-col items-start text-[#212529] space-y-2">
                {Array.isArray(place) ? (
                    place[0].map((event, index) => (
                        <p className="mt-2" key={index}>
                            <Linkify componentDecorator={linkDecorator}>
                                {event.item}
                            </Linkify>
                        </p>
                    ))
                ) : (
                    <p>{place.item}</p>  // Якщо place не масив, вивести одиничне значення
                )}
            </div>
        </div>
    );
};

export default Place;
