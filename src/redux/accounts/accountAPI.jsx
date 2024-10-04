import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

// Fetch account data
export const fetchAccount = async (search = '', page = 10) => {
    const response = await axios.get(API_ENDPOINTS.TAIKHOAN + `?search=${search}&page=${page}`);
    return response.data;
};

// Add a new account
export const addAccount = async (taiKhoan) => {
    const response = await axios.post(API_ENDPOINTS.TAIKHOAN, taiKhoan);
    return response.data;
};

// Update an existing account
export const updateAccount = async (id, taiKhoan) => {
    console.log(id, taiKhoan);
    const response = await axios.put(API_ENDPOINTS.TAIKHOAN + "/" + id, taiKhoan);
    return response.data;
};
