import ContentPlace from "../components/ContentPlace.tsx";
import Line from "../components/Line.tsx";
import OrganizationalCommitteeHead from "../components/organizationalCommittee/organizationalCommitteeHead.tsx";
import Deputiesorganizingcommittee from "../components/organizationalCommittee/Deputiesorganizingcommittee.tsx";
import Membersorganizingcommittee from "../components/organizationalCommittee/Membersorganizingcommittee.tsx";

const OrganizationalCommittee = () => {


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