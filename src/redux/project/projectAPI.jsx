import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

// Fetch project data
export const fetchProjects = async (search = '', page = 1) => {
    const response = await axios.get(API_ENDPOINTS.DUAN + `?search=${search}&page=${page}`);
    return response.data;
};
export const fetchByIdProject = async (id) => {
    const response = await axios.get(API_ENDPOINTS.DUAN+"/"+id);
    return response.data;
};
// Add a new project
export const addProject = async (project) => {
    const response = await axios.post(API_ENDPOINTS.DUAN, project);
    return response.data;
};

// Update an existing project
export const updateProject = async (id, project) => {
    const response = await axios.put(API_ENDPOINTS.DUAN + "/" + id, project);
    return response.data;
};
