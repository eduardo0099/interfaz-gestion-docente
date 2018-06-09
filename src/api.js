import axios from 'axios';


const api  = axios.create({
    baseURL: 'http://200.16.7.151:8080'

});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("jwt");
    config.headers = {
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': `${token}`
    };
    return config;
})

export default api;