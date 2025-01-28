import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://class-vault-server.vercel.app'
});
export default axiosPublic;