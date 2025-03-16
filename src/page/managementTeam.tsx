import { FC } from "react";
import ContentPlace from "../components/ContentPlace.tsx";
import Line from "../components/Line.tsx";
import { useQuery } from "@tanstack/react-query";
import client from "../../contentfulClient.tsx";
import ManagementTeamFields from "../components/ManagementTeam/ManagementTeamFields.tsx";
import Conferencechair from "../components/ManagementTeam/Conferencechair.tsx";

const ManagementTeam: FC = () => {
    return (
        <div className={'flex justify-center'}>
            <ContentPlace>
                <section className={'flex items-center text-[#212529] font-[segoeuithibd] flex-col mt-8'}>
                   <ManagementTeamFields/>
                    <Line />
                    <h1 className={'text-[28px]'}>Співголови конференції</h1>
                    <div>
                        <Conferencechair/>
                    </div>
                </section>
            </ContentPlace>
        </div>
    );
}

export default ManagementTeam;
