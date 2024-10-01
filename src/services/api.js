import axios from "axios";

const api = axios.create({
    baseURL: "https://api-usuarios-jq2i.onrender.com"
})

export default api