import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Slider = ({ photo }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % (photo?.[0]?.sliderPics.length || 1));
        }, 10000);

        return () => clearInterval(interval);
    }, [photo]);

    const nextSlide = (e) => {
        e.preventDefault();
        setIndex((prevIndex) => (prevIndex + 1) % (photo?.[0]?.sliderPics.length || 1));
    };

    const prevSlide = (e) => {
        e.preventDefault();
        setIndex((prevIndex) => (prevIndex - 1 + (photo?.[0]?.sliderPics.length || 1)) % (photo?.[0]?.sliderPics.length || 1));
    };

    return (
        <div className="relative h-[200px]  sm:h-[550px]  w-[85%] mt-16 overflow-hidden">
            <AnimatePresence>
                <motion.img
                    key={photo?.[0]?.sliderPics?.[index]?.url}
                    src={photo?.[0]?.sliderPics?.[index]?.url || ""}
                    className="w-full h-[200px]  sm:h-[550px] object-cover"
                    alt={`Slide ${index + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: "absolute", top: 0 }}
                />
            </AnimatePresence>
            <button
                onClick={prevSlide}
                className="absolute sm:block hidden left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 shadow-lg"
            >
                ◀
            </button>
            <button
                onClick={nextSlide}
                className="absolute sm:block hidden right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 shadow-lg"
            >
                ▶
            </button>
        </div>
    );
};

export default Slider;
