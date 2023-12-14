import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem('book2life-adminToken')


//Constante de sauvegarde d'un administrateur dans la bdd
export const saveAdmin = () => {
  return axios.post(`${config.api_url}/api/v1/admin/add`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//Contante de connexion d'un administrateur
export const loginAdmin = (datas) => {
  return axios.post(`${config.api_url}/api/v1/admin/login`, datas)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};


export function checkMyToken(){
  return axios.get(`${config.api_url}/api/v1/admin/checkToken`, {headers: {"x-access-token": token}})
      .then((response)=>{
          return response.data
      })
      .catch((err)=>{
          return err
      })
}


//Constante pour changer de mot de passe
export const forgotPassword = (datas) => {
  return axios.post(`${config.api_url}/api/v1/admin/forgot`, datas)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
