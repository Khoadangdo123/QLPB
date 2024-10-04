import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

// Fetch assignment data
export const fetchAssignments = async (search = '', page = 1) => {
    const response = await axios.get(API_ENDPOINTS.PHANCONG + `?search=${search}&page=${page}`);
    return response.data;
};

// Add a new assignment
export const addAssignment = async (assignment) => {
    const response = await axios.post(API_ENDPOINTS.PHANCONG, assignment);
    return response.data;
};

// Update an existing assignment
export const updateAssignment = async (id, assignment) => {
    const response = await axios.put(API_ENDPOINTS.PHANCONG + "/" + id, assignment);
    return response.data;
};

// Delete an assignment
export const deleteAssignment = async (id) => {
    const response = await axios.delete(API_ENDPOINTS.PHANCONG + "/" + id);
    return response.data;
};
