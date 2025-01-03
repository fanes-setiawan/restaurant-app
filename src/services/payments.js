import axiosInstance from './api';

const URL = '/api/payments';

export const getAllPayment = async () => {
    try {
        const response = await axiosInstance.get(URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching menus:', error);
        throw error;
    }
};

export const getPaymentById = async (id) => {
    try {
        const response = await axiosInstance.get(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu by ID:', error);
        throw error;
    }
};

export const deletePayment = async (id) => {
    try {
        const response = await axiosInstance.delete(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting menu:', error);
        throw error;
    }
};
