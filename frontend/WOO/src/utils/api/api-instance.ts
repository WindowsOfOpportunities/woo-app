import { notification } from 'antd';
import axios, { AxiosInstance, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

const baseServerUrl = 'http://localhost:3009/api/v1';

// Reusable Axios Configuration
const createAxiosInstance = (baseURL: string): AxiosInstance => {
    const options: CreateAxiosDefaults<any> = {
        baseURL,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return axios.create(options);
};

// Axios instance to connect to ATOM BACK END
export const axiosInstance = createAxiosInstance(baseServerUrl);


function requestInterceptor(axiosInstance: AxiosInstance, accessToken: string) {
    axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig<any>) => {
        config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
        return config;
    });
}

function responseInterceptor(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            // Error
            const {
                config,
                response: { status },
            } = error;
            if (status === 401) {

                if (error?.response?.data?.message === 'Invalid JWT token') {
                    notification.error({
                        message: 'SESSION ENDED!',
                        description: 'Your session has ended! Your page will be reloaded shortly...',
                        key: 'session',
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 5000);
                } else {
                    notification.error({
                        duration: 5,
                        message: 'PERMISSION ERROR',
                        description: 'Please check your account permissions with EUSI customer service.',
                        key: 'permission',
                    });
                }
            } else if (status === 500) {
                console.error('Connection to backend failed.');
                return Promise.reject(error);
            } else {
                return Promise.reject(error);
            }
        }
    );
}

export const axiosInterceptor = (accessToken: string) => {
    requestInterceptor(axiosInstance, accessToken);
    responseInterceptor(axiosInstance);
};
