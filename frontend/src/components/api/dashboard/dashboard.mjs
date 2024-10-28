import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const get_task_job_analytics = async () => {
    const token = Cookies.get('token');
    return await axios.get(`${backendUrl}/api/dashboard/get_task_job_statistics`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export {
    get_task_job_analytics
};