import axios from "axios";
const axiosConfig = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

// axiosConfig.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default axiosConfig;
