import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const login = async (username, password) => {
  const response = await api.post("/login", { username, password });
  return response.data;
};

  

export const getMenus = async () => {
  const response = await api.get("/menus");
  return response.data;
};

export const createMenu = async (menu) => {
  const response = await api.post("/menus", menu);
  return response.data;
};

export const deleteMenu = async (id) => {
  const response = await api.delete(`/menus/${id}`);
  return response.data;
};

export default api;
