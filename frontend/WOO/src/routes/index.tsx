import { Outlet, RouterProvider } from "react-router";
import LoginPage from "../modules/login";
import { createBrowserRouter } from "react-router";
import DashBoard from "../modules/dashboard";

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
            element: <DashBoard />,
            children: [
                {
                    path: '/dashboard',
                    element: <>test</>,
                },
                {
                    path: '/dashboard/profile',
                    element: <>profile</>,
                },
                {
                    path: '/dashboard/search',
                    element: <>search</>,
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
