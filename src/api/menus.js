import axiosInstance from './axiosInstance';

export const fetchMenus = async () => {
  const response = await axiosInstance.get('/menus');
  return response.data;
};
