const Place = ({ place }) => {
    console.log(place);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-[20px] sm:text-[30px] flex font-bold text-black text-center">
                Місце проведення конференції
            </h1>
            <div className="text-[12px] sm:text-[20px] mt-5 flex flex-col items-center text-[#212529]">

                {place && place.map((event, index) => (
                    <p key={index}>
                        {event.places}
                        <a className="text-blue-600 hover:text-[#212529]" href={event.link}>
                        </a>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Place;
