import { Outlet, RouterProvider } from "react-router";
import LoginPage from "../modules/login";
import { createBrowserRouter } from "react-router";
import DashBoard from "../modules/dashboard";
import AddWindowForm from "../modules/dashboard/find-window";
import PannelWrapper from "../components/layout/sidebar";

const NotFoundException = () => {
    return null;
};

const memoryRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: <LoginPage />,
        },
        {
            path: '/dashboard',
            element: <PannelWrapper />,
            children: [
                {
                    index: true,
                    element: <DashBoard />,

                },
                {
                    path: '/dashboard/find-window',
                    element: <>find</>,
                },
                {
                    path: '/dashboard/add-window',
                    element: <AddWindowForm />,
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundException />,
        },
    ]

);

const Routes = () => {
    return (
        <RouterProvider router={memoryRouter} />
    );
};

export default Routes;
