import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:8000/api"
});

api.interceptors.request.use(
    (config)=>{
        const userInfo=JSON.parse(localStorage.getItem("userInfo"));
        const token=userInfo?.token  ;
        if(token)
        {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response)=>response,
    (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('userInfo');
          window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;