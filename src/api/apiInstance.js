import axios from "axios"

const baseUrl = 'localhost:5000/api'

const api = axios.create({
    baseURL : baseUrl,
    headers : {
        'Content-Type' : 'application/json'
    },
    timeout : 15000
})

export default api