import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";
// Fetch task data
export const fetchWorkDepartment = async (search = '', page = 1) => {
    const response = await axios.get(API_ENDPOINTS.CONGVIECPHONGBAN + `?search=${search}&page=${page}`);
    return response.data;
};
// Add a new task
export const addWorkDepartment = async (WorkDepartment) => {
    const response = await axios.post(API_ENDPOINTS.CONGVIECPHONGBAN, WorkDepartment);
    return response.data;
};
// Update an existing task
export const updateWorkDepartment = async (id, WorkDepartment) => {
    const response = await axios.put(API_ENDPOINTS.CONGVIECPHONGBAN + "/" + id, WorkDepartment);
    return response.data;
};
export const fetchByIdWorkDepartment = async (id) => {
    const response = await axios.get(API_ENDPOINTS.CONGVIECPHONGBAN+"/"+id);
    return response.data;
};
export const fetchByIdDepartment = async (id) => {
    const response = await axios.get(API_ENDPOINTS.CONGVIECPHONGBAN+`/GetPhongBanPhanCong/${id}`);
    return response.data;
};
