import axios from "axios";
const axiosConfig = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

export default axiosConfig;
