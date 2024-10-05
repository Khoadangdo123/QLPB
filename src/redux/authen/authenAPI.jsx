import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

export const Login = async (AuthRequest) => {
    const response = await axios.post(API_ENDPOINTS.AUTH+"Login", AuthRequest);
    return response.data;
};

export const RefreshToken = async (RefreshTokenRequest) => {
    console.log(RefreshTokenRequest);
    const response = await axios.put(API_ENDPOINTS.AUTH+"RefreshToken",RefreshTokenRequest);
    return response.data;
};
