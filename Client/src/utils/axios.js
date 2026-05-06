import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:7000/api/rooms",
    withCredentials: true,
});

export default api;