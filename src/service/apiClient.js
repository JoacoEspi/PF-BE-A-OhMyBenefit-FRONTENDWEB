import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'https://localhost:8080',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


export default apiClient;