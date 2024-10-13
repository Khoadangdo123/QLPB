import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";
export const fetchEmployees=async (search='',page=10)=>{
    const response=await axios.get(API_ENDPOINTS.NHAVIEN+"?"+`search=${search}&page=${page}`)
    console.log(API_ENDPOINTS.NHAVIEN)
    return response.data;
}
export const addEmployee=async (employee)=>{
    const response=await axios.post(API_ENDPOINTS.NHAVIEN,employee)
    return response.data;
}
export const updateEmployee=async (id,employee)=>{
    const response=await axios.put(API_ENDPOINTS.NHAVIEN+"/"+id,employee)
    return response.data;
}