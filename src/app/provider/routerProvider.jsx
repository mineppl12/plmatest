import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

// ###

import Home from "~pages/home";
import About from "~pages/about";

import Points_View from "~pages/points/view";
import Points_Apply from "~pages/points/apply";
import Points_History from "~pages/points/history";
import Points_Remarks from "~pages/points/remarks";
import Points_Reason from "~pages/points/reason";

import MyPoints_View from "~pages/myPoints/view";

import Dorm_Status from "~pages/dorm/status";
import Dorm_Settings from "~pages/dorm/settings";

import Case_Control from "~pages/remote/case/control";

import Page404 from "~pages/404";

// ###

import Navbar from "~shared/ui/navbar";
import Sidebar from "~shared/ui/sidebar";
import { pathKeys } from "~shared/lib/react-router/pathKey.js";

const userType = {
    student: new Set([
        "viewMyPointsView",

        "viewMyDormView",
        "viewMyDormRepair",

        "viewSchoolMyInfo",
        "viewSchoolReportCard"
    ]),
    admin: new Set([
        "viewPointsView",
        "viewPointsApply",
        "viewPointsEdit",
        "viewPointsHistory",
        "viewPointsRemarks",
        "viewPointsReason",
        "viewPointsLogs",
        "viewPointsFix",
        "viewMyPointsView",
    
        "viewDormStatus",
        "viewDormSettings",
        "viewDormRepair",
        "viewMyDormView",
        "viewMyDormRepair",
        
        "viewRemoteCaseControl",
        "viewRemoteCaseHistory",
    
        "viewIAMPosition",
        "viewIAMAccounts",
        "viewIAMAccess"
    ])
};

const userPermissions = userType["admin"];

function Layout(){
    const location = useLocation();
    const isFullScreen = location.pathname === pathKeys.about.root();

    return (
        <>
            <Sidebar userPermissions={userPermissions} />
            <Navbar />
            <div className={isFullScreen ? "fullScreen" : "panel"}>
                <div className="panel_wrap">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

const routesWithPermissions = [
    { pathKey: pathKeys.home.root(), element: <Home /> },
    { pathKey: pathKeys.about.root(), element: <About /> },
  
    { pathKey: pathKeys.points.view(), element: <Points_View /> },
    { pathKey: pathKeys.points.apply(), element: <Points_Apply /> },
    { pathKey: pathKeys.points.history(), element: <Points_History /> },
    { pathKey: pathKeys.points.remarks(), element: <Points_Remarks /> },
    { pathKey: pathKeys.points.reason(), element: <Points_Reason /> },

    { pathKey: pathKeys.points.myPoints.view(), element: <MyPoints_View /> },
  
    { pathKey: pathKeys.dorm.status(), element: <Dorm_Status /> },
    { pathKey: pathKeys.dorm.settings(), element: <Dorm_Settings /> },

    
    { pathKey: pathKeys.remote.case.control(), element: <Case_Control /> },
];

const filteredRoutes = routesWithPermissions
    .filter(route => !route.pathKey.permission || userPermissions.has(route.pathKey.permission))
    .map(({ pathKey, element }) => ({ path: pathKey.link, element }));

const browserRouter = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            ...filteredRoutes,
            { path: "*", element: <Page404 /> }
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={browserRouter} />;
}