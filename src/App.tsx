// App.tsx
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './page/MainPage';
import ManagementTeam from './page/managementTeam';
import ProgramComittee from './page/programComittee';
import OrganizationalCommittee from './page/organizationalCommittee';
import Layout from './Layout.tsx';
import HisrtoryPage from "./page/historyPge.tsx";
import ThematicDirections from "./page/thematicDirections.tsx";
import Funders from "./page/Funders.tsx";
import InfoPartners from "./page/infoPartners.tsx";
import RequirementsTheses from "./page/requirementsTheses.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <MainPage />,
                },
                {
                    path: "/management-team",
                    element: <ManagementTeam />,
                },
                {
                    path: "/program-comittee",
                    element: <ProgramComittee/>,
                },
                {
                    path: "/organizational-committee",
                    element: <OrganizationalCommittee />,
                },
                {
                    path : "/history",
                    children: [
                        {
                            path: "/history:historyPart",
                            element : <HisrtoryPage/>,
                        },
                        {
                            path: "/history/funders",
                            element : <Funders/>,
                        },
                    ]
                },
                {
                    path: "/info-partners",
                    element: <InfoPartners/>,
                },{
                    path: "/thematic-directions",
                    element: <ThematicDirections />,
                },{
                    path: "/requirements-theses",
                    element: <RequirementsTheses/>,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
