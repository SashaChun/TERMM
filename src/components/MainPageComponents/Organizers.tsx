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
    return <div className={'bg-white'}>
        <div className={'flex justify-center'} >
            <img
                className="w-[300px] h-[200px] rounded-[20px] p-5 border-2 border-transparent hover:border-gray-400 hover:shadow-xl transition-all duration-300 ease-in-out"
                src={monPhoto}
                alt="universityLogos"
            />
            <img
                className="w-[300px] h-[200px] rounded-[10px] p-5 border-2 border-transparent hover:border-gray-400 hover:shadow-xl transition-all duration-300 ease-in-out"
                src={logolntu}
                alt="universityLogos"
            />
        </div>
        <div className={'p-5 flex flex-wrap  justify-center gap-8'}>
        {universityLogos.map((logo, index) => (
            <img
                className="w-[140px] h-[140px] p-5 border-2 border-transparent hover:border-gray-400 hover:shadow-xl transition-all duration-300 ease-in-out"
                src={logo}
                key={index}
                alt="universityLogos"
            />

        ))}
    </div></div>
}

export default Organizers