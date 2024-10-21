import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

export const fetchTaskHistories = async (search = '', page = 1) => {
    const response = await axios.get(`${API_ENDPOINTS.LICHSUCONGVIEC}?search=${search}&page=${page}`);
    return response.data;
}

export const addTaskHistory = async (taskHistory) => {
    const response = await axios.post(API_ENDPOINTS.LICHSUCONGVIEC, taskHistory);
    return response.data;
}

export const updateTaskHistory = async (id, taskHistory) => {
    const response = await axios.put(`${API_ENDPOINTS.LICHSUCONGVIEC}/${id}`, taskHistory);
    return response.data;
};

export const fetchTaskHistoryById = async (id) => {
    const response = await axios.get(`${API_ENDPOINTS.LICHSUCONGVIEC}/${id}`);
    return response.data;
};

export const deleteTaskHistory = async (id) => {
    const response = await axios.delete(`${API_ENDPOINTS.LICHSUCONGVIEC}/${id}`);
    return response.data;
};
