import ContentPlace from "../components/ContentPlace.tsx";

import ViktorrudPhoto from '../assets/organizational-committee/viktorrud.png'
import OlenaLutakPhoto from  '../assets/organizational-committee/olenalutak.png'
import MukolamelnychukPhoto from '../assets/organizational-committee/mukolamelnychuk.png'
import ValentinaTjachujPhoto from '../assets/organizational-committee/valentynatkachuk.png'
import IgorMuravanuiPhoto from '../assets/organizational-committee/igormurovanyi.png'
import YliaPOvsanaPhoto from '../assets/organizational-committee/yuliapovstyana4.jpg'
import SergiShumchukPhoto from '../assets/organizational-committee/sergiyshymchuk.png'
import OleksandrLkumenkoPhoto from '../assets/organizational-committee/oleksandrklymenko.png'
import DmitroGusahukPhoto from '../assets/organizational-committee/dusafhuk.jpg'
import ZaichukNataliaPhoto from '../assets/organizational-committee/Zaichuk.jpg'
import VitaliiKAACHUCKIpPhoto from '../assets/organizational-committee/kashuk.jpg'
3
import Line from "../components/Line.tsx";

const OrganizationalCommittee = () => {

    const Person = [
        {name : 'д.т.н., професор Валентина Ткачук' , photo : ValentinaTjachujPhoto},
        {name : 'к.т.н., доцент Ігор Мурований' , photo : IgorMuravanuiPhoto},
        {name : 'к.т.н., доцент Юлія Повстяна' , photo : YliaPOvsanaPhoto},
        {name : 'к.т.н., доцент Сергій Шимчук' , photo : SergiShumchukPhoto},
        {name : 'к.т.н., доцент Олександр Клименко' , photo : OleksandrLkumenkoPhoto},
        {name : 'к.т.н., доцент Дмитро Гусачук' , photo : DmitroGusahukPhoto},
        {name : 'к.т.н., доцент Наталія Зайчук' , photo : ZaichukNataliaPhoto},
        {name : 'к.т.н., доцент Віталій Кашицький' , photo : VitaliiKAACHUCKIpPhoto},
    ]

    return <div className={'flex justify-center  text-[#212529]'}>
        <ContentPlace>
            <section className={'flex  flex-col'}>
                <div className={'flex items-center flex-col'}>
                    <h1 className={'text-[30px]  font-[500] mt-5 '}>Організаційний комітет</h1>
                    <img className={'w-[250px] mt-5'} src={ViktorrudPhoto} alt="Viktorrud"/>
                    <h3 className={'text-[18px] mt-2'}>Голова оргкомітету - д.т.н., професор Віктор Рудь</h3>
                    <p className={'text-blue-600 mt-2'}> 📧 (vikdmrud@gmail.com); </p>
                </div>
                <Line/>
                <div>
                    <h1 className={'text-[30px] text-center  font-[500] mt-5 '}>Організаційний комітет</h1>
                    <div className={'flex flex-row justify-center mt-5 space-x-20'}>
                        <div className={'flex items-center flex-col'}>
                            <img className={'w-[250px] mt-5'} src={OlenaLutakPhoto} alt="Viktorrud"/>
                            <h3 className={'text-[18px] mt-2'}>д.е.н., професор Олена Лютак</h3>
                            <p className={'text-blue-600 mt-2'}>📧 (o.liutak@lntu.edu.ua);</p>
                        </div>
                        <div className={'flex items-center flex-col'}>
                            <img className={'w-[250px] mt-5'} src={MukolamelnychukPhoto} alt="Viktorrud"/>
                            <h3 className={'text-[18px] mt-2'}>к.т.н., доцент Микола Мельничук</h3>
                            <p className={'text-blue-600 mt-2'}>📧 (melnuchyk80@gmail.com)</p>
                        </div>
                    </div>
                </div>
                <Line/>
                <h1 className={'text-[30px] text-center font-[500] mt-5'}>Члени</h1>
                <div className={'flex flex-wrap justify-center mt-5 gap-20'}>
                    {Person.map((event) => (
                        <div className={'flex items-center flex-col'}>
                            <img className={'w-[250px] h-[350px] mt-5'} src={event.photo} alt="Viktorrud"/>
                            <h3 className={'text-[18px] mt-2'}>{event.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </ContentPlace>
    </div>
}

export default OrganizationalCommittee