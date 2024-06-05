import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem('book2life-token')

//récupération des conversations
/*export const loadUserConversations = (userId, bookId) => {
    return axios.get(`${config.api_url}/api/v1/conversations/${userId}/${bookId}`, {headers: { "x-access-token": token }})
        .then((res) => res.data)
        .catch((err) => err.response.data);
};*/

export const loadUserConversations = (userId) => {
    return axios.get(`${config.api_url}/api/v1/conversations/${userId}`, {headers: { "x-access-token": token }})
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const loadOneConversation = (conversationId) => {
  return axios.get(`${config.api_url}/api/v1/conversation/${conversationId}`, {headers: { "x-access-token": token }})
      .then((res) => res.data)
      .catch((err) => err.response.data);
};

export const saveConversation = (datas) => {
    return axios
    .post(config.api_url + "/api/v1/conversation/save", datas, {headers: { "x-access-token": token }})
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });    
}

//mise à jour de newchat 
export const updateFirstMessage = (conversationId) => {
  return axios
  .put(config.api_url + `/api/v1/update/firstMessage/${conversationId}`)
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return err;
  });   
}

export const updateFalse = (conversationId) => {
  return axios
  .put(config.api_url + `/api/v1/update/false/${conversationId}`)
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return err;
  });   
}

//suppression d'une conversation
export const deleteOneConversation= (conversationId) => {
  return axios
  .delete(config.api_url + `/api/v1/conversation/delete/${conversationId}`, {headers: { "x-access-token": token }})
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return err;
  });
}

