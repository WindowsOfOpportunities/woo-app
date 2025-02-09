import { Navigate, Outlet, RouterProvider } from "react-router";
import LoginPage from "../modules/login";
import { createBrowserRouter } from "react-router";
import DashBoard from "../modules/dashboard";
import AddWindowForm from "../modules/dashboard/add-window";
import PannelWrapper from "../components/layout/panel-wrapper";
import FindWindow from "../modules/dashboard/find-window";
import NotFoundPage from "../components/pages/not-found";
import AntdConfigProvider from "../utils/providers/antd";
import React from "react";

// AuthGuard: Protect routes that require authentication
const AuthGuard = () => {
    const isAuthenticated = Boolean(localStorage.getItem("token")); // Replace with actual auth check
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

// LoginGuard: Redirect to dashboard if already authenticated
const LoginGuard = () => {
    const isAuthenticated = Boolean(localStorage.getItem("token"));
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginGuard />, // If logged in, redirect to dashboard
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <AuthGuard />, // Protect dashboard routes
        children: [
            {
                path: '',
                element: <PannelWrapper />, // Keep layout wrapper
                children: [
                    {
                        index: true,
                        element: <DashBoard />,
                    },
                    {
                        path: 'find-window',
                        element: <FindWindow />,
                    },
                    {
                        path: 'add-window',
                        element: <AddWindowForm />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

const Routes = () => {
    return (
        <AntdConfigProvider>
            <RouterProvider router={router} />
        </AntdConfigProvider>
    );
};

export default Routes;
