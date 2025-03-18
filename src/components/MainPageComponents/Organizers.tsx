import monPhoto from '../../assets/organizers/MON.png';
import aztuEdu from '../../assets/organizers/aztu.edu.png';
import cafedralanguage from '../../assets/organizers/cafedralanguage.jpg';
import cafedramashinebuild from '../../assets/organizers/cafedramashinebuild.jpg';
 import dnipro from '../../assets/organizers/dnipro.png';
import fimnanu from '../../assets/organizers/FIMNANU.jpg';
import inm from '../../assets/organizers/INM.jpg';
import ipmnanUkrainy from '../../assets/organizers/IPMNANUkrainy.jpg';
import ipz from '../../assets/organizers/ipz.jpg';
import ivanoFrankivskOil from '../../assets/organizers/IvanoFrankivskOil.jpg';
import kpi from '../../assets/organizers/KPI.jpg';
import ktgr from '../../assets/organizers/ktgr.png';
import logolntu from '../../assets/organizers/logolntu.jpg';
import lundsUniversitet from '../../assets/organizers/Lunds_universitet.svg.png';
 import materialscience from '../../assets/organizers/materialscience.jpg';
import mon from '../../assets/organizers/MON.png';
import politehnicalubelska from '../../assets/organizers/politehnicalubelska.jpg';
import rigaTU from '../../assets/organizers/rigaTU.jpg';
import ternopilskyiNTU from '../../assets/organizers/ternopilskyiNTU.jpg';
import tohoku from '../../assets/organizers/tohoku.png';
import ughorodskyiNU from '../../assets/organizers/UghorodskyiNU.jpg';
import umt from '../../assets/organizers/umt.jpg';
import vntu from '../../assets/organizers/VNTU.jpg';
import {useQuery} from "@tanstack/react-query";
import client from "../../../contentfulClient.tsx";
import Loader from "../Loading.tsx";

const universityLogos = [
    aztuEdu,
    cafedralanguage,
    cafedramashinebuild,
     dnipro,
    fimnanu,
    inm,
    ipmnanUkrainy,
    ipz,
    ivanoFrankivskOil,
    kpi,
    ktgr,
    lundsUniversitet,
     materialscience,
    mon,
    politehnicalubelska,
    rigaTU,
    ternopilskyiNTU,
    tohoku,
    ughorodskyiNU,
    umt,
    vntu
];


const Organizers = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['organizerssang'],
        queryFn: async () => {
            const response = await client.getEntries({ content_type: "organizerssang" });

            return response.items.map((item) => {
                const photoId = item.fields.photo?.[0]?.sys?.id;
                const photo = response.includes?.Asset?.find(asset => asset.sys.id === photoId);
                const photoUrl = photo ? `https:${photo.fields.file.url}` : null;

                return {
                    link: item.fields.link,
                    photo: photoUrl,
                };
            });
        },
    });
    console.log(data)

    const reverData = data && [...data].reverse();

    if (isLoading) return <Loader/>;
    return (
        <div className="bg-white py-0 sm:py-10">
            <div className="flex justify-center gap-4 sm:gap-8 flex-wrap mb-10">
                <a href={data && reverData[1].link}> <img
                    className="w-[250px] sm:w-[300px] h-[150px] sm:h-[200px] rounded-[20px] p-5 border-2 border-transparent hover:border-gray-400 hover:shadow-xl transition-all duration-300 ease-in-out"
                    src={data && reverData[1].photo}
                    alt="universityLogos"
                /></a>
                <a href={data && reverData[0].link}> <img
                    className="w-[250px] sm:w-[300px] h-[150px] sm:h-[200px] rounded-[20px] p-5 border-2 border-transparent hover:border-gray-400 hover:shadow-xl transition-all duration-300 ease-in-out"
                    src={data && reverData[0].photo}
                    alt="universityLogos"
                /></a>
            </div>
            <div className="p-5 flex flex-wrap justify-center gap-0 sm:gap-8">
                {data && reverData.reverse()?.slice(0, -2).map((logo, index) => (
                    <a href={logo.link} key={index}>
                        <img
                            className="w-[120px] sm:w-[140px] h-[120px] sm:h-[140px] p-5 border-2 border-transparent hover:border-gray-400 hover:shadow-xl transition-all duration-300 ease-in-out"
                            src={logo.photo}
                            alt="universityLogos"
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Organizers;