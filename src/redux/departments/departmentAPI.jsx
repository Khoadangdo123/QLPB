import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";
export const fetchDepartment=async (search='',page=10)=>{
    const response=await axios.get(API_ENDPOINTS.PHONGBAN+"?"+`search=${search}&page=${page}`)
    return response.data;
}
export const addDepartment=async (department)=>{
    const response=await axios.post(API_ENDPOINTS.PHONGBAN,department)
    return response.data;
}
export const updateDepartment=async (id,department)=>{
    console.log(id,department)
    const response=await axios.put(API_ENDPOINTS.PHONGBAN+"/"+id,department)
    return response.data;
}
export const fetchManagerDepartment=async (id)=>{
    const response=await axios.get(API_ENDPOINTS.PHONGBAN+`/GetTruongPhongById/${id}`)
    return response.data;
}