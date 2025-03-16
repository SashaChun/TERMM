import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Menu() {
    const [openMenu, setOpenMenu] = useState(null);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { data: titles = [], isLoading } = useQuery({
        queryKey: ["history"],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "history" });
            return response.items.map(item => ({
                name: item.fields.linkName,
                path: `/history/${item.fields.id}`
            }));
        },
    });

    const textData = [
        { name: "Головна", path: "/" },
        {
            name: "Комітети",
            items: [
                { name: "Керівничий склад", path: "/management-team" },
                { name: "Програмний комітет", path: "/program-comittee" },
                { name: "Організаційний комітет", path: "/organizational-committee" },
            ],
        },
        {
            name: "Історія конференцій",
            items: [
                { name: "Історія", path: "/history", items: isLoading ? [] : titles },
                { name: "Фундатори", path: "/history/funders" },
            ],
        },
        { name: "Тематичні напрямки", path: "/thematic-directions" },
        { name: "Реєстрація", path: "/registration" },
    ];

    return (
        <nav className="bg-[#3b3c93] p-4 relative">
            <button
                className="text-white text-3xl md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
            <ul className="hidden md:flex items-center justify-between px-10 text-white">
                {textData.map((item, index) => (
                    <li
                        key={index}
                        className="relative"
                        onMouseEnter={() => setOpenMenu(index)}
                        onMouseLeave={() => setOpenMenu(null)}
                    >
                        {!item.items ? (
                            <Link to={item.path} className="text-[16px] relative">
                                {item.name}
                            </Link>
                        ) : (
                            <span className="text-[16px] cursor-pointer">{item.name}</span>
                        )}

                        {item.items && openMenu === index && (
                            <div className="absolute left-0 top-full flex flex-col bg-[#3b3c93] pb-1 text-white rounded-md shadow-md w-max min-w-[150px]">
                                {item.items.map((subItem, subIndex) => (
                                    <div
                                        key={subIndex}
                                        className="relative"
                                        onMouseEnter={() => subItem.path === "/history" && setOpenSubMenu(subIndex)}
                                        onMouseLeave={() => subItem.path === "/history" && setOpenSubMenu(null)}
                                    >
                                        <Link to={subItem.path} className="px-4 py-1 block hover:bg-yellow-400 hover:text-[#3b3c93]">
                                            {subItem.name}
                                        </Link>
                                        {subItem.path === "/history" && openSubMenu === subIndex && subItem.items && (
                                            <div className="absolute left-full top-0 flex flex-col bg-[#3b3c93] pb-1 text-white rounded-md shadow-md w-max min-w-[150px]">
                                                {subItem.items.map((nestedItem, nestedIndex) => (
                                                    <Link
                                                        key={nestedIndex}
                                                        to={nestedItem.path}
                                                        className="px-4 py-1 block hover:bg-yellow-400 hover:text-[#3b3c93]"
                                                    >
                                                        {nestedItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {/* Мобільне меню */}
            {mobileMenuOpen && (
                <ul className="md:hidden flex flex-col bg-[#3b3c93] p-4 text-white absolute top-full left-0 w-full z-50">
                    {textData.map((item, index) => (
                        <li key={index} className="border-b border-white py-2">
                            {!item.items ? (
                                <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>
                                    {item.name}
                                </Link>
                            ) : (
                                <div>
                                    <span className="cursor-pointer" onClick={() => setOpenMenu(openMenu === index ? null : index)}>
                                        {item.name}
                                    </span>
                                    {openMenu === index && (
                                        <ul className="pl-4">
                                            {item.items.map((subItem, subIndex) => (
                                                <li key={subIndex} className="py-1">
                                                    <Link to={subItem.path} onClick={() => setMobileMenuOpen(false)}>
                                                        {subItem.name}
                                                    </Link>
                                                    {subItem.items && (
                                                        <ul className="pl-4">
                                                            {subItem.items.map((nestedItem, nestedIndex) => (
                                                                <li key={nestedIndex} className="py-1">
                                                                    <Link to={nestedItem.path} onClick={() => setMobileMenuOpen(false)}>
                                                                        {nestedItem.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}