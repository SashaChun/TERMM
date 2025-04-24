import Menu from "./Menu.tsx";
import Logo from "../assets/Logo.png";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import LanguageSwitch from "./LanguageSwitch.tsx";
import {useSelector} from 'react-redux'
import {  selectLanguage } from '../store/languageSlice'
import Loader from "./Loading.tsx";

const Header = () => {
    const lng = useSelector(selectLanguage);
    console.log(lng )
    const { data, error, isLoading } = useQuery({
        queryKey: ['header',lng],  
        queryFn: async () => {
            const response = await client.getEntries({
                content_type: "header",
                locale: lng 
            });
            return response.items.map((event) => ({
                title: event.fields.title,
                year: event.fields.year,
            }));
        },
    });

    if (isLoading) return <Loader />;

    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <header className="bg-[#2c2e94e0] flex flex-col  xl:flex-row items-center py-10 px-5 xl:px-10 h-auto xl:h-[300px]  xl:text-left">
                <img
                    className="xl:w-[200px] w-[90%] xl:h-[40px] md:h-[200px] h-[100px]   xl:left-10 my-4 xl:my-0"
                    src={Logo}
                    alt="Logo"
                />
                <div className="w-[50%] xl:w-auto flex flex-col items-center text-center mx-auto">
                    <p className="w-[90%] text-[15px] xl:w-[60%] sm:text-[20px] xl:text-[24px] text-white mx-auto">
                        {data && data[0]?.title ? String(data[0]?.title) : " "}
                    </p>
                    <p className="text-white text-[18px] mt-2 xl:text-[22px] font-bold">
                        {data && data[0]?.year ? String(data[0]?.year) : ""}
                    </p>
                </div>
                <LanguageSwitch/>
            </header>
            <Menu />
        </>
    );
};

export default Header;
