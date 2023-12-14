import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { config } from "../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../slices/userSlice";
import { loadBooks } from "../slices/bookSlice";
import { loadBooksByUser } from "../api/book";



//HOC de controle des data et de la sécurité
const RequireAuth = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const params = useParams();
  const Child = props.child;
  const [redirect, setRedirect] = useState(false);
  
  useEffect(()=>{
      //récupération du token dans le localStorage
      const token = window.localStorage.getItem("book2life-token");
      //si le token est null et que la route est protégée
      if (token === null && props.auth) {
        //on demande une redirection
        setRedirect(true);
      //sinon
      }else{
        //si l'utilisateur est déconnecté dans le store de redux
        if (user.isLogged === false) {
          //on va vérifier le token 
          axios.get(config.api_url + "/api/v1/user/checkToken", {headers: { "x-access-token": token }})
          .then((res) => {
            //console.log("RequireAuth useEffect", res);
            //si le status de la réponse n'est pas 200
            if (res.data.status !== 200) {
              //si la route est protégée
              if (props.auth) {
                //redirection
                window.localStorage.removeItem("book2life-token");
                setRedirect(true);
              } 
            //sinon le statut est 200
            }else{
              //on récup les infos de l'utilisateur qu'on stock dans une variable user
              let user = res.data.user[0];
              //on rajoute le token à l'objet
              user.token = token;
              //on met à jour le store pour connecter l'utilisateur
              dispatch(setUser(user));
              
               //on récupère les livres par utilisateur (fonction ajax)
               loadBooksByUser(user.id_user)
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
  }, [props.auth, user.isLogged, dispatch])
  
  
  if (redirect) {
    return <Navigate to="/userLogin" />;
  }

  return <Child {...props} params={params} />;
}


export default RequireAuth;