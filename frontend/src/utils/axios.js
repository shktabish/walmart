import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/api/v1"
})

export default api