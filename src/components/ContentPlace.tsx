import { ReactNode } from "react";

interface ContentPlaceProps {
    children: ReactNode;
}

const ContentPlace: React.FC<ContentPlaceProps> = ({ children }) => {
    return (
        <div className="sm:w-[100%] w-[95vw] pb-5 flex flex-col min-h-screen px-5 mt-5 bg-[#f5f5f5]">
            {children}
        </div>
    );
};

export default ContentPlace;
