import axios from "axios";

const USER_API_BASE_URL = "http://localhost:4000/api/users/"

export const getAllUsers = () => {
    return axios.get(USER_API_BASE_URL);
}

export const getUserById = (userId) => {
    return axios.get(USER_API_BASE_URL + userId);
}

export const getRecipeFromUserById = (userId) => {
    return axios.get(USER_API_BASE_URL + userId + "/receipes")
}

export const getExercicesFromUserById = (userId) => {
    return axios.get(USER_API_BASE_URL + userId + "/exercises")
}

export const updateUser = (user) => {
    return axios.put(USER_API_BASE_URL, user);
}

export const deleteUserById = (userId) => {
    return axios.delete(USER_API_BASE_URL + userId)
}


