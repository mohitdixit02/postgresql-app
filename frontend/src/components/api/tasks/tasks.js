import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const get_tasks = async () => {
    const token = Cookies.get('token');
    return await axios.get(`${backendUrl}/api/tasks/get_tasks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

const update_status = async (body) => {
    const token = Cookies.get('token');
    return await axios.post(`${backendUrl}/api/tasks/update_task`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

const create_task = async (body) => {
    const token = Cookies.get('token');
    return await axios.post(`${backendUrl}/api/tasks/create_task`, body, {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    });
}

export {
    get_tasks,
    update_status,
    create_task
}

