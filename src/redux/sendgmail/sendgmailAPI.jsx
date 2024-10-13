import axios from "axios";
import API_ENDPOINTS from "../../constant/linkapi";

export const sendGmail = async (gmail) => {
    const response = await axios.post(API_ENDPOINTS.SENDGMAIL, gmail);
    return response.data;
};