import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { config } from "../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectAdmin, setAdmin } from "../slices/adminSlice";
import { loadBooks } from "../slices/bookSlice";
import { loadNotValidateBooks } from "../api/book";


//HOC de controle des data et de la sécurité
const RequireAuthAdmin = (props) => {
  const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);
  const params = useParams();
  const Child = props.child;
  const [redirect, setRedirect] = useState(false);
  
  useEffect(()=>{
      const token = window.localStorage.getItem("book2life-adminToken");
 
      if (token === null && props.auth) {
        setRedirect(true);
      }else{
        if (admin.isLogged === false) {
          //on va vérifier le token 
          axios.get(config.api_url + "/api/v1/admin/checkToken", {headers: { "x-access-token": token }})
          .then((res) => {
            //console.log("RequireAuth useEffect", res);
            if (res.data.status !== 200) {
              //si la route est protégée
              if (props.auth) {
                window.localStorage.removeItem("book2life-adminToken");
                setRedirect(true);
              } 
            }else{
              //on récup les infos de l'administrateur (objet) qu'on stock dans une variable admin
              let admin = res.data.admin[0];
              //on rajoute le token à l'objet
              admin.token = token;
              //on met à jour le store pour connecter l'administrateur
              dispatch(setAdmin(admin));   
              
              //on récupère les livres à vérifier pour validation par un administrateur (fonction ajax)
              loadNotValidateBooks()
                .then((res) => {
                  //console.log("all books not validate");
                  dispatch(loadBooks(res.books));
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log("error checkToken", err);
          });

        }
      }        
  }, [props.auth, admin.isLogged, dispatch])
  
  
  if (redirect) {
    return <Navigate to="/adminLogin" />;
  }
  return <Child {...props} params={params} />;
}


export default RequireAuthAdmin;