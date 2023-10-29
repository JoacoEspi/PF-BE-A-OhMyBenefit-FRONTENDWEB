import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:8080', //revisar que tenia s
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


export default apiClient;