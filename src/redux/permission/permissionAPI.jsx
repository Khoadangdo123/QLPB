import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

// Fetch permission data
export const fetchPermissions = async (search = '', page = 1) => {
    const response = await axios.get(API_ENDPOINTS.NHOMQUYEN + `?search=${search}&page=${page}`);
    return response.data;
};

// Add a new permission
export const addPermission = async (permission) => {
    const response = await axios.post(API_ENDPOINTS.NHOMQUYEN, permission);
    return response.data;
};

// Update an existing permission
export const updatePermission = async (id, permission) => {
    const response = await axios.put(API_ENDPOINTS.NHOMQUYEN + "/" + id, permission);
    return response.data;
};
export const fetchPermissionById = async (id) => {
    const response = await axios.get(API_ENDPOINTS.NHOMQUYEN + "/" + id);
    return response.data;
};