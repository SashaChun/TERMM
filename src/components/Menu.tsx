import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import { IoMenu, IoClose } from "react-icons/io5";

// Типізація для елементів меню
type MenuItem = {
    name: string;
    path: string | null;
    items?: MenuItem[];
    download?: boolean;
};

export default function Menu() {
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { data: titles = [], isLoading } = useQuery({
        queryKey: ["history"],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "history" });
            return response.items.map(item => ({
                name: item.fields.linkName as string,
                path: `/history/${item.fields.id as string}`
            }));
        },
    });

    const { data: download } = useQuery({
        queryKey: ["file"],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "file" });

            // Дістаємо URL першого файлу, якщо він є
            const fileUrl = response.includes?.Asset?.[0]?.fields?.file?.url;
            return fileUrl ? `https:${fileUrl}` : null;
        },
    });

    const { data: registr } = useQuery({
        queryKey: ["registr"],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "registr" });
            return response.items[0].fields.form as string;
        },
    });

    const textData: MenuItem[] = [
        { name: "Головна", path: "/" },
        {
            name: "Комітети",
            path: null,
            items: [
                { name: "Керівничий склад", path: "/management-team" },
                { name: "Програмний комітет", path: "/program-comittee" },
                { name: "Організаційний комітет", path: "/organizational-committee" },
            ],
        },
        {
            name: "Історія конференцій",
            path: null,
            items: [
                { name: "Історія", path: "/history", items: isLoading ? [] : titles },
                { name: "Фундатори", path: "/history/funders" },
            ],
        },
        { name: "Тематичні напрямки", path: "/thematic-directions" },
        {
            name: "Вимоги до публікацій",
            path: null,
            items: [
                { name: " Інформаційні партнери", path: "/info-partners" },
                { name: "Вимоги до оформлення тез", path: "/requirements-theses" },
                { name: "Збірник TERMM-2023", path: download ?? null, download: true },
            ],
        },
        { name: "Конференційні програми", path: "/conference-program" },
        { name: "Важливі дати", path: "/important-dates" },
        { name: "Платіжна інформація", path: "/pay-info" },
        { name: "Реєстрація", path: registr ?? null },
    ];

    return (
        <nav className="bg-[#3b3c93] z-20 p-4 relative">
            <button
                className="text-white text-3xl md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
            <ul className="hidden md:flex items-center justify-between px-1
             text-white">
                {textData.map((item, index) => (
                    <li
                        key={index}
                        className="relative"
                        onMouseEnter={() => setOpenMenu(index)}
                        onMouseLeave={() => setOpenMenu(null)}
                    >
                        {!item.items ? (
                            <Link to={item.path ?? "#"} className="xl:text-[16px] md:text-[12px] relative">
                                {item.name}
                            </Link>
                        ) : (
                            <span className="xl:text-[16px] md:text-[12px] cursor-pointer">{item.name}</span>
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
                                        {subItem.download ? (
                                            <a
                                                href={subItem.path ?? "#"}
                                                download
                                                className="px-4 py-1 block hover:bg-yellow-400 hover:text-[#3b3c93]"
                                            >
                                                {subItem.name}
                                            </a>
                                        ) : (
                                            <Link to={subItem.path ?? "#"} className="px-4 py-1 block hover:bg-yellow-400 hover:text-[#3b3c93]">
                                                {subItem.name}
                                            </Link>
                                        )}
                                        {subItem.path === "/history" && openSubMenu === subIndex && subItem.items && (
                                            <div className="absolute left-full top-0 flex flex-col bg-[#3b3c93] pb-1 text-white rounded-md shadow-md w-max min-w-[150px] z-50">
                                                {subItem.items.map((nestedItem, nestedIndex) => (
                                                    <Link
                                                        key={nestedIndex}
                                                        to={nestedItem.path ?? "#"}
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

            {mobileMenuOpen && (
                <ul className="md:hidden flex flex-col bg-[#3b3c93] p-4 text-white absolute top-full left-0 w-full z-50">
                    {textData.map((item, index) => (
                        <li key={index} className="border-b border-white py-2">
                            {!item.items ? (
                                <Link to={item.path ?? "#"} onClick={() => setMobileMenuOpen(false)}>
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
                                                    {subItem.download ? (
                                                        <a
                                                            href={subItem.path ?? "#"}
                                                            download
                                                            className="px-4 py-1 block hover:bg-yellow-400 hover:text-[#3b3c93]"
                                                        >
                                                            {subItem.name}
                                                        </a>
                                                    ) : (
                                                        <Link to={subItem.path ?? "#"} onClick={() => setMobileMenuOpen(false)}>
                                                            {subItem.name}
                                                        </Link>
                                                    )}
                                                    {subItem.items && (
                                                        <ul className="pl-4">
                                                            {subItem.items.map((nestedItem, nestedIndex) => (
                                                                <li key={nestedIndex} className="py-1">
                                                                    <Link to={nestedItem.path ?? "#"} onClick={() => setMobileMenuOpen(false)}>
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