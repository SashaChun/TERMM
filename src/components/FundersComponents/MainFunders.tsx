import React from "react";
import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";

const MainFunders = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['Firstfundators'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "Firstfundators" });
            return response;
        },
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;
    if (!data?.items || data.items.length === 0) return <p>No data found</p>;

    return (
        <div className="max-w-4xl mx-auto ">
            {data.items.map((item) => (
                <div key={item.sys.id}>
                    <p className="text-lg text-gray-700 text-center">
                        {item.fields.text}
                    </p>
                    <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center items-center">
                        {item.fields.photo1?.map((photo) => {
                            const asset = data.includes?.Asset?.find(a => a.sys.id === photo.sys.id);
                            return asset ? (
                                <img
                                    key={asset.sys.id}
                                    src={"https:" + asset.fields.file.url}
                                    alt={asset.fields.title}
                                    className="w-64 h-80 object-cover   shadow-md"
                                />
                            ) : null;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MainFunders;
