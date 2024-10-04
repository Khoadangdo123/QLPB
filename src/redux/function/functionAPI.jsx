import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

// Fetch function data
export const fetchFunctions = async (search = '', page = 10) => {
    const response = await axios.get(API_ENDPOINTS.CHUCNANG + `?search=${search}&page=${page}`);
    return response.data;
};

// Add a new function
export const addFunction = async (func) => {
    const response = await axios.post(API_ENDPOINTS.CHUCNANG, func);
    return response.data;
};

// Update an existing function
export const updateFunction = async (id, func) => {
    const response = await axios.put(API_ENDPOINTS.CHUCNANG + "/" + id, func);
    return response.data;
};
