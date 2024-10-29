import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

export const fetchPermissions = async (search = '', page = 1) => {
    const response = await axios.get(API_ENDPOINTS.NHOMQUYEN + `?search=${search}&page=${page}`);
    return response.data;
}
export const addPermission = async (permission) => {
    const response = await axios.post(API_ENDPOINTS.NHOMQUYEN, permission);
    return response.data;
}
export const updatePermission = async (id, permission) => {
    const response = await axios.put(API_ENDPOINTS.NHOMQUYEN + "/" + id, permission);
    return response.data;
};
export const fetchPermissionById = async (id) => {
    const response = await axios.get(API_ENDPOINTS.NHOMQUYEN + "/" + id);
    return response.data;
};