import { axiosInstance } from "./api-instance";

export const getWindowsList = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/external/window`);
        return response.data
    } catch (error) {
        throw error;
    }
};
export const getImageByWindowId = async (imageUrl: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/external/window-image/${imageUrl}`);
        return response.data
    } catch (error) {
        throw error;
    }
};
export const getVersion = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/core/version`);
        return response.data
    } catch (error) {
        throw error;
    }
};

export const createWindow = async (formData: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/external/window`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data
    } catch (error) {
        throw error;
    }
};
