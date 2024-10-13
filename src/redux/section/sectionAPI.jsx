import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

export const fetchSections = async (search = '', page = 1) => {
    const response = await axios.get(API_ENDPOINTS.PHANDUAN + `?search=${search}&page=${page}`);
    return response.data;
};

export const addSection = async (section) => {
    const response = await axios.post(API_ENDPOINTS.PHANDUAN, section);
    return response.data;
};

export const updateSection = async (id, section) => {
    const response = await axios.put(API_ENDPOINTS.PHANDUAN + "/" + id, section);
    return response.data;
};
