import ContentPlace from "../components/ContentPlace.tsx";
import Reglament from "../components/ImportantDatesComponents/Reglament.tsx";
import ImportantDatas from "../components/ImportantDatesComponents/importantDatas.tsx";

const ImportantDates = () => {

    return (
        <div className="flex justify-center">
            <ContentPlace>
                <section className={'text-[#212529]'}>
                   <Reglament/>
                    <ImportantDatas/>
                </section>
            </ContentPlace>
        </div>
    );
};

export default ImportantDates;
