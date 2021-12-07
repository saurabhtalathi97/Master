import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:4000/api/"

export const register = (username, password, color) => {
    return axios.post(AUTH_API_BASE_URL + "register", { username: username, password: password, color: color });
}

export const authenticate =  (userUsername, userPassword) => {
    return axios.post(AUTH_API_BASE_URL + "login", { username: userUsername, password: userPassword });
}