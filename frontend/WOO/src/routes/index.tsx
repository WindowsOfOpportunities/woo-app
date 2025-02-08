import { RouterProvider } from "react-router";
import LoginPage from "../modules/login";
import { createBrowserRouter } from "react-router";
import DashBoard from "../modules/dashboard";
import AddWindowForm from "../modules/dashboard/add-window";
import PannelWrapper from "../components/layout/sidebar";
import FindWindow from "../modules/dashboard/find-window";

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
                    element: <FindWindow />,
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
