
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Spring backend adresi
});

export default api;