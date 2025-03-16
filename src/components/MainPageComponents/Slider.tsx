import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Slider = ({ photo }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 10000);

        return () => clearInterval(interval);
    }, [index]);

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % (photo?.[0]?.sliderPics.length || 1));
    };

    const prevSlide = () => {
        setIndex((prevIndex) => (prevIndex - 1 + (photo?.[0]?.sliderPics.length || 1)) % (photo?.[0]?.sliderPics.length || 1));
    };

    // Отримуємо URL з photo
    const imgSrc = photo?.[0]?.sliderPics?.[index]?.url || "";

    return (
        <div className="relative h-[550px] w-[85%] mt-16 overflow-hidden">
            <AnimatePresence>
                <motion.img
                    key={imgSrc}
                    src={imgSrc}
                    className="w-full h-[550px] object-cover"
                    alt={`Slide ${index + 1}`}
                    initial={{ opacity: 0, backgroundColor: "white" }}
                    animate={{ opacity: 1, backgroundColor: "transparent" }}
                    exit={{ opacity: 0, backgroundColor: "white" }}
                    transition={{ duration: 0.8 }}
                />
            </AnimatePresence>
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 shadow-lg"
            >
                ◀
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 shadow-lg"
            >
                ▶
            </button>
        </div>
    );
};

export default Slider;
