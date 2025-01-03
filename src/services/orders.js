import axiosInstance from './api';

const URL = '/api/orders';

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get(URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching menus:', error);
        throw error;
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await axiosInstance.get(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw error;
    }
};

export const createOrder = async (order) => {
    try {
        const response = await axiosInstance.post(URL, order);
        return response.data;
    } catch (error) {
        console.error('Error creating menu:', error);
        throw error;
    }
};

export const updateOrder = async (id, order) => {
    try {
        const response = await axiosInstance.put(`${URL}/${id}`, order);
        return response.data;
    } catch (error) {
        console.error('Error updating menu:', error);
        throw error;
    }
};

export const deleteOrderById = async (id) => {
    try {
        const response = await axiosInstance.delete(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting menu:', error);
        throw error;
    }
};
