import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

export const createChiTietFile = async (chiTietFile) => {
  const response = await axios.post(API_ENDPOINTS.CHITIETFILE, chiTietFile);
  return response.data;
};

export const fetchChiTietFileByPhanCong = async (id) => {
  const response = await axios.get(`${API_ENDPOINTS.CHITIETFILE}/${id}`);
  return response.data;
};
export const deleteChiTietFile=async(id)=>{
  const response = await axios.delete(`${API_ENDPOINTS.CHITIETFILE}/${id}`);
  return response.data;
}
