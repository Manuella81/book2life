import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem('book2life-token')


//Constante de récupération d'un utilisateur par son id
export const getOneUser = (id_user) => {
  return axios.get(`${config.api_url}/api/v1/user/one/${id_user}`)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//Constante de récupération de la latititude et de la longitude grâce à l'adresse et code postal de l'utisateur
export const getCoords = (address, zip)=>{
    //requète ajax vers nominatim https://nominatim.openstreetmap.org/search?q='+address+' '+zip+'&format=geocodejson
    return axios.get('https://nominatim.openstreetmap.org/search?q='+address+' '+zip+'&format=geocodejson')
        .then((response)=>{
            return response.data;
        })
        .catch((err)=>{
            return err
        })
}

//Constante de sauvegarde d'un utilisateur dans la bdd
export const saveUser = (datas) => {
  return axios.post(`${config.api_url}/api/v1/user/add`, datas)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//Contante de connexion d'un utilisateur
export const loginUser = (datas) => {
  return axios.post(`${config.api_url}/api/v1/user/login`, datas)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

//modification des infos utilisateur
export function updateProfil(datas, id_user){
  return axios.put(`${config.api_url}/api/v1/user/update/${id_user}`, datas, {headers: {"x-access-token": token}})
  .then((res)=>{
      return res.data
  })
  .catch((err)=>{
      return err
  })
}

export function checkMyToken(){
  return axios.get(`${config.api_url}/api/v1/user/checkToken`, {headers: {"x-access-token": token}})
      .then((response)=>{
          return response.data
      })
      .catch((err)=>{
          return err
      })
}


//Constante pour changer de mot de passe
export const forgotPassword = (datas) => {
  return axios.post(`${config.api_url}/api/v1/user/forgot`, datas)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
