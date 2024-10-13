import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

// Fetch permission detail data
export const fetchPermissionDetails = async (search = '', page = 1) => {
    const response = await axios.get(API_ENDPOINTS.CHITIETQUYEN + `?search=${search}&page=${page}`);
    return response.data;
};

// Add a new permission detail
export const addPermissionDetail = async (permissionDetail) => {
    const response = await axios.post(API_ENDPOINTS.CHITIETQUYEN, permissionDetail);
    return response.data;
};

// Update an existing permission detail
export const updatePermissionDetail = async (id, permissionDetail) => {
    const response = await axios.put(API_ENDPOINTS.CHITIETQUYEN + "/" + id, permissionDetail);
    return response.data;
};
