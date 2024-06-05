import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem('book2life-token')

export const loadConversationMessages = (conversationId) => {
    return axios.get(`${config.api_url}/api/v1/messages/${conversationId}`, {headers: { "x-access-token": token }})
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const sendMessage = (messageData) => {
    return axios.post(`${config.api_url}/api/v1/messages`, messageData, {headers: { "x-access-token": token }})
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

