import axiosInstance from "../../interceptors/AxiosInstance";
export const fetchTaskHistories = async (search = '', page = 1) => {
    const response = await axiosInstance.get(`${"LichSuCongViec"}?search=${search}&page=${page}`);
    return response.data;
}

export const addTaskHistory = async (taskHistory) => {
    const response = await axiosInstance.post("LichSuCongViec", taskHistory);
    return response.data;
}

export const updateTaskHistory = async (id, taskHistory) => {
    const response = await axiosInstance.put(`${"LichSuCongViec"}/${id}`, taskHistory);
    return response.data;
};

export const fetchTaskHistoryById = async (id) => {
    const response = await axiosInstance.get(`${"LichSuCongViec"}/${id}`);
    return response.data;
};

export const deleteTaskHistory = async (id) => {
    const response = await axiosInstance.delete(`${"LichSuCongViec"}/${id}`);
    return response.data;
};
