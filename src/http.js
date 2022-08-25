import axios from "axios";

const token = localStorage.getItem('user-token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

let api =  axios.create({
    baseURL: "http://localhost:8184",
    headers: {
        "Content-type": "application/json",
        // "api-token": "",
    }
});

api.interceptors.response.use(
    res => res,
    err => {
        const statusCode = err.response.status;
        if (statusCode === 403) {
            localStorage.removeItem('user-token');
            window.location = '/login';
        }
        throw err;
    }
);

export default api;