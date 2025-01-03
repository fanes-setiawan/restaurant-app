import axiosInstance from './api';

const URL = '/api/users';

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching menus:', error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu by ID:', error);
        throw error;
    }
};
