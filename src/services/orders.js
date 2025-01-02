import axiosInstance from './api';

const MENU_URL = '/api/orders';

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get(MENU_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching menus:', error);
        throw error;
    }
};
