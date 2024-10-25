import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

// Fetch file data
export const fetchFile = async (id) => {
    const response = await axios.get(`${API_ENDPOINTS.FILES}/${id}`);
    return response.data;
};

// Add a new file
export const addFile = async (file) => {
    const response = await axios.post(API_ENDPOINTS.FILES, file);
    return response.data;
};

// Delete a file
export const deleteFile = async (id) => {
    await axios.delete(`${API_ENDPOINTS.FILES}/${id}`);
};
