import axios from "axios";

import storageService from "./storage";

const baseUrl = "http://localhost:3000/api/users";

const getHeaders = () => {
    return {
        headers: {
            Authorization: storageService.getToken()
                ? `Bearer ${storageService.getToken()}`
                : null,
        },
    };
};

const getAll = async () => {
    const response = await axios.get(baseUrl, getHeaders());
    return response.data;
};

const remove = async (userIds) => {
    await axios.post(`${baseUrl}/delete`, userIds, getHeaders());
};

const block = async (userIds) => {
    await axios.put(`${baseUrl}/block`, userIds, getHeaders());
};

const unblock = async (userIds) => {
    await axios.put(`${baseUrl}/unblock`, userIds, getHeaders());
};

export default { getAll, remove, block, unblock };
