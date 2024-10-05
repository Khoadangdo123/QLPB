import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

// Fetch task data
export const fetchTasks = async (search = '', page = 1) => {
    const response = await axios.get(API_ENDPOINTS.CONGVIEC + `?search=${search}&page=${page}`);
    return response.data;
};

// Add a new task
export const addTask = async (task) => {
    const response = await axios.post(API_ENDPOINTS.CONGVIEC, task);
    return response.data;
};

// Update an existing task
export const updateTask = async (id, task) => {
    const response = await axios.put(API_ENDPOINTS.CONGVIEC + "/" + id, task);
    return response.data;
};
export const fetchByIdTask = async (id) => {
    const response = await axios.get(API_ENDPOINTS.CONGVIEC+"/"+id);
    return response.data;
};

