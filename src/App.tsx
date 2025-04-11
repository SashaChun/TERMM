import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from "react";
import Layout from './Layout.tsx';
import Loader from "./components/Loading.tsx";
import ConferenceProgram from "./page/conferenceProgram.tsx";

const MainPage = lazy(() => import('./page/MainPage'));
const ManagementTeam = lazy(() => import('./page/managementTeam'));
const ProgramComittee = lazy(() => import('./page/programComittee'));
const OrganizationalCommittee = lazy(() => import('./page/organizationalCommittee'));
const HisrtoryPage = lazy(() => import("./page/historyPge.tsx"));
const ThematicDirections = lazy(() => import("./page/thematicDirections"));
const Funders = lazy(() => import("./page/Funders"));
const InfoPartners = lazy(() => import("./page/infoPartners"));
const RequirementsTheses = lazy(() => import("./page/requirementsTheses"));
const ImportantDates = lazy(() => import("./page/ImportantDates"));
const PayInfo = lazy(() => import("./page/payInfo"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <MainPage /> },
            { path: "/management-team", element: <ManagementTeam /> },
            { path: "/program-comittee", element: <ProgramComittee /> },
            { path: "/organizational-committee", element: <OrganizationalCommittee /> },
            { path: "/history/:historyPart", element: <HisrtoryPage /> }, // Оновлено параметр
            { path: "/history/funders", element: <Funders /> },
            { path: "/info-partners", element: <InfoPartners /> },
            { path: "/thematic-directions", element: <ThematicDirections /> },
            { path: "/requirements-theses", element: <RequirementsTheses /> },
            { path: "/important-dates", element: <ImportantDates /> },
            { path: "/pay-info", element: <PayInfo /> },
            { path: "/important-dates", element: <ImportantDates /> },
            { path: "/conference-program", element: <ConferenceProgram /> },
        ],
    },
]);

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
