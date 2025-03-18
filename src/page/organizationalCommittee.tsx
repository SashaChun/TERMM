import ContentPlace from "../components/ContentPlace.tsx";
import ValentinaTjachujPhoto from '../assets/organizational-committee/valentynatkachuk.png'
import IgorMuravanuiPhoto from '../assets/organizational-committee/igormurovanyi.png'
import YliaPOvsanaPhoto from '../assets/organizational-committee/yuliapovstyana4.jpg'
import SergiShumchukPhoto from '../assets/organizational-committee/sergiyshymchuk.png'
import OleksandrLkumenkoPhoto from '../assets/organizational-committee/oleksandrklymenko.png'
import DmitroGusahukPhoto from '../assets/organizational-committee/dusafhuk.jpg'
import ZaichukNataliaPhoto from '../assets/organizational-committee/Zaichuk.jpg'
import VitaliiKAACHUCKIpPhoto from '../assets/organizational-committee/kashuk.jpg'

import Line from "../components/Line.tsx";
import OrganizationalCommitteeHead from "../components/organizationalCommittee/organizationalCommitteeHead.tsx";
import Deputiesorganizingcommittee from "../components/organizationalCommittee/Deputiesorganizingcommittee.tsx";
import Membersorganizingcommittee from "../components/organizationalCommittee/Membersorganizingcommittee.tsx";

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
            <section>
                <OrganizationalCommitteeHead/>
                    <Line/>
                <Deputiesorganizingcommittee/>
                    <Line/>
                <Membersorganizingcommittee/>
            </section>
        </ContentPlace>
    </div>
}

export default OrganizationalCommittee;