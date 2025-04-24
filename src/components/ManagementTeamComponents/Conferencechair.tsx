import { useQuery } from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";

interface Asset {
    sys: {
        id: string;
    };
    fields: {
        file: {
            url: string;
        };
    };
}

const Conferencechair = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['Conferencechair' ],
        queryFn: async () => {
            const response = await client.getEntries({ 
                content_type: "ConferenceCoChairs", 

            });
            console.log(response);
            if (!response.items || response.items.length === 0) return [];
    
            const conferenceChairs = response.items;

            return conferenceChairs.map(chair => { 
                const photoField = Array.isArray(chair.fields.photo) ? chair.fields.photo[0] as Asset : null;
    
                // Якщо фото є, ми беремо його. Якщо ні, пробуємо знайти його для англійської мови.
                const photo = photoField?.fields?.file?.url ? `https:${photoField.fields.file.url}` : null;
                if (!photo  ) {
                    // Якщо фото немає для української, використовуємо фото для англійської.
                    const fallbackPhoto = conferenceChairs.find(ch => ch.fields.pib === chair.fields.pib); // знайдемо інший запис з таким самим ПІБ для англійської
                    const fallbackPhotoField = Array.isArray(fallbackPhoto?.fields.photo) ? fallbackPhoto?.fields.photo[0] as Asset : null;
                    return {
                        name: chair.fields.pib || '',
                        specialization: chair.fields.description || '',
                        photo: fallbackPhotoField?.fields?.file?.url ? `https:${fallbackPhotoField.fields.file.url}` : null
                    };
                }
    
                return {
                    name: chair.fields.pib || '',
                    specialization: chair.fields.description || '',
                    photo: photo
                };
            });
        },
    });
    
    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);

    return (
        <div className="flex flex-wrap justify-center items-center space-y-8"> 
            <div className="flex mt-10 flex-wrap justify-center gap-10">
                {data?.map((member, index) => (
                    <div key={index} className="flex flex-col items-center text-center max-w-[350px]">
                        {member.photo ? (
                            <img
                                src={member.photo}
                                alt={typeof member.name === 'string' ? member.name : 'No name'}
                                className="w-[300px] h-[450px] object-cover shadow-lg"
                            />
                        ) : (
                            <div className="w-[300px] h-[450px] bg-gray-200 flex items-center justify-center">
                                <span>Фото відсутнє</span>
                            </div>
                        )}
                        <p className="text-[22px] mt-5">{typeof member.name === 'string' ? member.name : ''}</p>
                        <p className="text-[18px] mt-3 w-[80%] text-center">{typeof member.specialization === 'string' ? member.specialization : ''}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Conferencechair;