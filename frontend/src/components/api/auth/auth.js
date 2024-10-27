import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const loginApi = (body) => {
    return axios.post(`${backendUrl}/api/auth/login`, body);
}

const registerApi = (body) => {
    return axios.post(`${backendUrl}/api/auth/register`, body);
}

export {
    loginApi,
    registerApi
};