import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const get_jobs = async () => {
    const token = Cookies.get('token');
    return await axios.get(`${backendUrl}/api/jobs/get_jobs`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

const create_job = async (body) => {
    const token = Cookies.get('token');
    return await axios.post(`${backendUrl}/api/jobs/create_job`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

const update_job = async (body) => {
    const token = Cookies.get('token');
    return await axios.post(`${backendUrl}/api/jobs/update_job`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

const delete_job = async (body) => {
    const token = Cookies.get('token');
    return await axios.post(`${backendUrl}/api/jobs/delete_job`, body, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export {
    get_jobs,
    create_job,
    update_job,
    delete_job
};